---
title: "Remedify"
description: "OCR-powered medication reminder app"
type: "dev"
tags:
  - React Native
  - Azure
  - OCR
  - LLM Integration
order: 1
---

![Remedify](/static/remedify/cover.jpg)

Remedify is a medication reminder app dedicated to accessibility and ensuring medical adherance.

**Links**

- [Github Repo](https://github.com/yeenathan/asclepius)
- [Remedify Landing Page](https://www.remedify.ca/)
- [Research Document](https://docs.google.com/document/d/1MGyxeF7pkwpVo4VsNl829hrDaSTTYn5Frfa2RREm4Nc/edit?tab=t.0)

**Tools**

- Expo/React Native
- Azure cloud functions & blob storage
- Azure Computer Vision (OCR)
- OpenAI compatible API 
- Canadian Drug Product Database (DPD)

**Takeaways**

- Working in an agile environment
- Team collaboration
- Team leadership & guidance
- Honing development skills

## Context

Only about 50% of prescribed medications are taken as directed by patients with chronic illnesses. Research identifies two key reasons: misunderstanding of medication instructions and forgetfulness.

Remedify is an AI-powered medication reminder app that bridges the gap in adherence, making health management easier and more efficient. Going beyond the capabilities of a standard pillbox, Remedify is designed for individuals facing cognitive challenges or managing multiple medications, where the risk of misdosing is high. With a strong focus on accessibility and adherence, the app offers a reminder and a comprehensive medication library to support users in staying on track with their health.

## Key Features

The app boasts two main features to assist patients with medical adherence while being as accessible as possible.

**Automated scanning**

![Scanning feature](/static/remedify/app1.jpg)

Automated med scanning while cross-referencing the Canadian Drug Product Database (DPD) for accessibility and accuracy. This feature enforces our focus on accessibility by simplifying the interaction to add a medication to the app.

The automatic scanning feature starts with **Azure AI Vision OCR**, specifically the Read API. Image data is uploaded using blob storage via a SAS URL so to be used by the OCR function.

### generateSASUrl (cloud function)

```javascript
app.http('generateSASUrl', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const json = await request.json();

        const blobClient = containerClient.getBlockBlobClient(json.imgname);
        var url = await blobClient.generateSasUrl({
            permissions: BlobSASPermissions.parse('wc'), // write and create
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + 5 * 60 * 1000), // 5 minutes
            protocol: SASProtocol.HttpsAndHttp, // Optional
            contentType: "image/*"
        });
        return { body: url };
    }
});
```

### doOCR (cloud function)

```javascript
app.http('doOCR', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const json = await request.json();

        const blobClient = containerClient.getBlockBlobClient(json.imgname);
        var url = await blobClient.generateSasUrl({
            permissions: BlobSASPermissions.parse('r'), // read
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + 5 * 60 * 1000), // 5 minutes
            protocol: SASProtocol.HttpsAndHttp, // Optional
        });

        //ocr with the url
        const client = computerVisionClient;
        const imgURL = url;

        let result = await client.read(imgURL);
        let operation = result.operationLocation.split('/').slice(-1)[0];

        while (result.status !== "succeeded") {
            await sleep(1000);
            result = await client.getReadResult(operation);
        }

        return {jsonBody: result};

        // return { body: url };
    }
});
```

### Calling the cloud functions

```javascript
const _url = await fetch("https://remedify-ocr.azurewebsites.net/api/generateSASUrl?", {
      method:"POST",
      body:JSON.stringify({
        imgname:"myimg.jpg"
      })
    });
    const _txt = await _url.text(); //sas url
    
    //first get SAS url for putting a blob in there
    const _b64resp = await fetch(data);
    const _blob = await _b64resp.blob();

    const _resp = await fetch(_txt, {
      method:"PUT",
      body:_blob,
      headers:{
        "x-ms-blob-type":"BlockBlob"
      }
    })

    const _ocr = await fetch("https://remedify-ocr.azurewebsites.net/api/doOCR?", {
      method:"POST",
      body:JSON.stringify({
        imgname:"myimg.jpg"
      })
    });
    
    const _result = await _ocr.json();
```

**Providing Information and Generated Insights**

![Information feature](/static/remedify/app2.jpg)

AI generated insights and additional information based on information fetched from DPD API. By providing this information, this feature addresses one of the main reasons for low medication adherence: confusion.

**OpenAI's GPT-4o mini** is used to parse the text data from OCR into a usable object as well as generate insights, such as side effects, using data fetched from the [Canadian Drug Database (DPD)](https://www.canada.ca/en/health-canada/services/drugs-health-products/drug-products/drug-product-database.html) API.

Due to time constraints, the OpenAI API implementation is done locally with a .env, rather than through a cloud function like the functions OCR above.

### Parsing text to object

```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a tool that that parses scanned OCR data from medication labels into usable data',
          },
          {
            role: 'user',
            content: `
              this is scanned OCR text from a medication label: ${inputText}. parse into json with properties "nickname", "dose", "frequency", "duration", "strength", "DIN" according to the following descriptions:
              "nickname": return the medication name
              "dose": return a dosage amount. example: 1 tablet
              "frequency": return a number in days. default to 0
              "duration": return a number in weeks. default to 0
              "strength": return strength per dose. example: 500mg
              "DIN": return unique 8 digit number found on every drug product in Canada
              if confidence levels are low, leave properties as the defaults or null
            `
          },
        ],
        response_format: { "type": "json_object" }
      }),
    });
```

### Fetching data from DPD

```javascript
async function getInfo(DIN) {
    async function getID(DIN) {
      const _resp = await fetch(`https://health-products.canada.ca/api/drug/drugproduct/?din=${DIN}`).then(resp => resp.json());
      if (!_resp[0]) return null;
      return {id: _resp[0].drug_code, name: _resp[0].brand_name};
    }
    const _drugProduct = await getID(DIN);
    if (!_drugProduct) return null;
    const _ingredientInfo = await fetch(`https://health-products.canada.ca/api/drug/activeingredient/?id=${_drugProduct.id}`).then(resp => resp.json());
    return {ingredient: _ingredientInfo[0].ingredient_name, name: _drugProduct.name};
  }
```

### Generating insights based on DPD

```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a tool that that returns general information about given active ingredients given the ingredient name and other relevant information. provide your answers in layman\'s terms',
          },
          {
            role: 'user',
            content: `
              given active ingredient ${drugData.ingredient} and medication name ${drugData.name}, return a json object with properties "description" and "sideEffects".
              description: is a string. max 250 characters
              sideEffects: array of strings. each string should be a single word. limit to 3-5 items
            `
          },
        ],
        response_format: { "type": "json_object" }
      }),
    });
```

## Research & Validation

A survey and numerous interviews were conducted by members of the team to refine and validate the app's ideas and to help craft the user personas.

<iframe width="100%" height="600" src="https://embed.figma.com/design/eqiBsR991DWqKMuktHQb1P/Persona?node-id=64-4&embed-host=share"></iframe>

**Primary persona: Elderly person**

- Motivations: Consistent routine, independence in everyday tasks
- Pain points: Memory lapses which lead to confusion about medication, limited comfort with technology

**Secondary persona: Caregiver**

- Motivations: Ensuring medical adherence for patients
- Pain points: Managing the needs of multiple patients

Based on our research, we solidified our **core values: accessibility and medical adherance**

[Read the full user findings document](https://docs.google.com/document/d/1MGyxeF7pkwpVo4VsNl829hrDaSTTYn5Frfa2RREm4Nc/edit?tab=t.0)

## Reflection

![Team photo](/static/remedify/asclepius.jpg)

This project provided me with invaluable experiences in development, working within a team, as well as leadership. As the lead developer of the project I was responsible for not only delivering the results, but also collaborating with the designers to discuss viability of certain features and providing guidance/mentorship to other members of the dev team.

Some challenges included learning new tools along the way, and initially, delegating work to my team because of unfamiliarity with their skillsets. However with a supportive team culture we were able to tackle problems early on and cover for each others' weaknesses.
