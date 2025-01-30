import { Link } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import ToTop from "./components/ToTop";
import ProjectHero from "./components/ProjectHero";
import ProjectDetails from "./components/ProjectDetails";
import Code from "./components/Code";
import { useRef } from "react";

const projects = [
  {
    name: "Remedify",
    image: "/images/remedify/cover.jpg",
    route: "/remedify",
    type: "dev",
    tags: ["Front-end development", "React Native", "Azure", "OpenAI"]
  },
  {
    name: "Studius",
    image: "/images/studius/studius-cover.png",
    route: "/studius",
    type: "dev gd",
    tags: ["Front-end development", "React", "UX/UI design", "Branding design", "Figma"]
  },
  {
    name: "Currency Converter",
    image: "/images/currency-converter/cover.jpg",
    route: "/currency-converter",
    type: "dev",
    tags: ["HTML", "CSS", "Javascript", "Frankfurter API"]
  },
  {
    name: "Dragon Ball: Architecture & Wonders",
    image: "/images/db-mag/cover.jpg",
    route: "/db-mag",
    type: "gd",
    tags: ["Editorial design", "Print design", "Adobe InDesign"]
  },
  {
    name: "Graphic Design Projects",
    image: "/images/designs/cover.jpg",
    route: "/designs",
    type: "gd",
    tags: ["Poster design", "Package design", "Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects"]
  },
  {
    name: "Graphic Design Commissions",
    image: "/images/graphic-design/cover.jpg",
    route: "/graphic-design-commissions",
    type: "gd",
    tags: ["Thumbnail design", "Social media promotion & assets", "Photoshop", "Illustrator"]
  },
  {
    name: "VAN-GO!",
    image: "/images/van-go/cover.jpg",
    route: "/van-go",
    type: "dev",
    tags: ["React", "Leaflet API"]
  },
]

export default projects;

export function Remedify() {
  const uploadCode = `const _url = await fetch("https://remedify-ocr.azurewebsites.net/api/generateSASUrl?", {
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
    
    const _result = await _ocr.json();`
  const generateSASUrl = `app.http('generateSASUrl', {
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
});`
  const doOCR = `app.http('doOCR', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const json = await request.json();

        const blobClient = containerClient.getBlockBlobClient(json.imgname);
        var url = await blobClient.generateSasUrl({
            permissions: BlobSASPermissions.parse('r'), // write and create
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
});`
  const OpenAiParser = `const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: \`Bearer \${OPENAI_API_KEY}\`,
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
            content: \`
              this is scanned OCR text from a medication label: \${inputText}. parse into json with properties "nickname", "dose", "frequency", "duration", "strength", "DIN" according to the following descriptions:
              "nickname": return the medication name
              "dose": return a dosage amount. example: 1 tablet
              "frequency": return a number in days. default to 0
              "duration": return a number in weeks. default to 0
              "strength": return strength per dose. example: 500mg
              "DIN": return unique 8 digit number found on every drug product in Canada
              if confidence levels are low, leave properties as the defaults or null
            \`
          },
        ],
        response_format: { "type": "json_object" }
      }),
    });`;
  const OpenAIGenerate = `const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: \`Bearer \${OPENAI_API_KEY}\`,
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
            content: \`
              given active ingredient \${drugData.ingredient} and medication name \${drugData.name}, return a json object with properties "description" and "sideEffects".
              description: is a string. max 250 characters
              sideEffects: array of strings. each string should be a single word. limit to 3-5 items
            \`
          },
        ],
        response_format: { "type": "json_object" }
      }),
    });`
  const dinInfo = `async function getInfo(DIN) {
    async function getID(DIN) {
      const _resp = await fetch(\`https://health-products.canada.ca/api/drug/drugproduct/?din=\${DIN}\`).then(resp => resp.json());
      if (!_resp[0]) return null;
      return {id: _resp[0].drug_code, name: _resp[0].brand_name};
    }
    const _drugProduct = await getID(DIN);
    if (!_drugProduct) return null;
    const _ingredientInfo = await fetch(\`https://health-products.canada.ca/api/drug/activeingredient/?id=\${_drugProduct.id}\`).then(resp => resp.json());
    return {ingredient: _ingredientInfo[0].ingredient_name, name: _drugProduct.name};
  }`

  const azure = useRef();
  const openai = useRef();
  const reflection = useRef();

  const content = "Remedify is a medication reminder app dedicated to accessibility and ensuring medical adherance."
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5">
      <Header/>
      <ToTop/>
      <ProjectHero title={"Remedify"} coverPath={"/images/remedify/cover.jpg"} content={content}/>
      <ProjectDetails
        links={[
          { url: "https://www.remedify.ca/", label: "Remedify Landing Page" },
          { url: "https://remedify-blog.vercel.app/", label: "Remedify Blog" },
          { url: "https://github.com/yeenathan/asclepius", label: "Project Repo" }
        ]}
        tools={[
          "Expo/React Native",
          "Kitten UI",
          "Azure cloud functions & blob storage",
          "Azure Computer Vision (OCR)",
          "OpenAI GPT-4o mini",
          "Canadian Drug Produtd Database (DPD)"
        ]}
      />
      <div className="min-w-full">
        <div className="mb-2">
          <p className="font-bold">Takeaways</p>
          <a onClick={() => reflection.current.scrollIntoView()} style={{cursor: "pointer"}}>Read reflection</a>
        </div>
        <ul className="pl-8 list-disc grid grid-cols-1 md:grid-cols-2">
          <li>Working in an agile environment</li>
          <li>Team collaboration</li>
          <li>Team leadership & guidance</li>
          <li>Honing development skills</li>
        </ul>
      </div>
      <div className="mt-2 md:mt-6 max-w-full md:max-w-3xl flex flex-col gap-2 md:gap-3">
        <img src="/images/remedify/asclepius.jpg" className="max-w-full"/>
        <table>
          <tr>
            <td><strong>Role:</strong></td>
            <td>Lead developer, research & validation</td>
          </tr>
          <tr>
            <td><strong>Timeline:</strong></td>
            <td>3 months</td>
          </tr>
        </table>

        <h2 className="case-header">Context</h2>
        <p>Only about 50% of prescribed medications are taken as directed by patients with chronic illnesses. Research identifies two key reasons: misunderstanding of medication instructions and forgetfulness.</p>
        <p>Remedify is an AI-powered medication reminder app that bridges the gap in adherence, making health management easier and more efficient. Going beyond the capabilities of a standard pillbox, Remedify is designed for individuals facing cognitive challenges or managing multiple medications, where the risk of misdosing is high. With a strong focus on accessibility and adherence, the app offers a reminder and a comprehensive medication library to support users in staying on track with their health.</p>
        <h2 className="case-header">Key Features</h2>
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold">Automated scanning</p>
          <a style={{cursor: "pointer"}} onClick={() => azure.current.scrollIntoView()}>Scroll to details</a>
        </div>
        <img src="/images/remedify/app1.jpg" style={{border: "2px solid #272727"}}/>
        <p className="mb-2 md:mb-4">Automated med scanning while cross-referencing the Canadian Drug Product Database (DPD) for accessibility and accuracy.</p>
        
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold">Providing Information and Generated Insights</p>
          <a style={{cursor: "pointer"}} onClick={() => openai.current.scrollIntoView()}>Scroll to details</a>
        </div>
        <img src="/images/remedify/app2.jpg" style={{border: "2px solid #272727"}}/>
        <p>AI generated insights and additional information based on information fetched from DPD API.</p>
        <h2 className="case-header">Research & Validation</h2>
        <p>A survey and numerous interviews were conducted by members of the team to refine and validate the app's ideas and to help craft the user personas.</p>
        <p className="font-bold">Primary persona: Elderly person</p>
        <ul className="list-disc pl-8">
          <li>Motivations: Consistent routine, independence in everyday tasks</li>
          <li>Pain points: Memory lapses which lead to confusion about medication, limited comfort with technology</li>
        </ul>
        <p className="font-bold">Secondary persona: Caregiver</p>
        <ul className="list-disc pl-8">
          <li>Motivations: Ensuring medical adherence for patients</li>
          <li>Pain points: Managing the needs of multiple patients</li>
        </ul>
        <p>Based on our research, we solidified our <strong>core values: accessibility and medical adherance</strong></p>

        <h2 className="case-header">Development</h2>
        <p>The development process started with early mock-ups with placeholder data as the team did continuous research on how to implement all the desired features. We also made continuous interface changes as the design team iterated on the design based on usability testing and professional feedback.</p>
        <p>The implementation of our main features is described below.</p>
        <h2 className="case-header" ref={azure}>Automated Scanning: Azure AI Vision OCR & Blob Storage</h2>
        <p>The automatic scanning feature starts with Azure AI Vision OCR, specifically the Read API. Image data is uploaded using blob storage via a SAS URL so to be used by the OCR function.</p>
        <Code text={generateSASUrl} title={"generateSASUrl (cloud function)"} />
        <Code text={doOCR} title={"doOCR (cloud function)"} />
        <Code text={uploadCode} title={"Calling the cloud functions"} link={"https://github.com/yeenathan/Asclepius/blob/main/app/components/UploadImg.js"}/>

        <h2 className="case-header" ref={openai}>Parsing Info and Generating Insights: OpenAI GPT-4o mini & DPD API</h2>
        <p>OpenAI's GPT-4o mini is used to parse the text data from OCR into a usable object as well as generate insights, such as side effects, using data fetched from the <Link to={"/https://www.canada.ca/en/health-canada/services/drugs-health-products/drug-products/drug-product-database.html"}>Canadian Drug Database (DPD)</Link> API.</p>
        <Code text={OpenAiParser} title={"Parsing text to object"} link={"https://github.com/yeenathan/Asclepius/blob/main/app/components/OpenAIParser.js"}/>
        <Code text={dinInfo} title={"Fetching data from DPD"} link={"https://github.com/yeenathan/Asclepius/blob/main/app/pages/new-hifi/FormScreen.js"}/>
        <Code text={OpenAIGenerate} title={"Generating insights based on DPD"} link={"https://github.com/yeenathan/Asclepius/blob/main/app/components/OpenAIGetInfo.js"}/>
      
        <h2 className="case-header" ref={reflection}>Reflection</h2>
        <p>This project provided me with invaluable experiences in development, working within a team, as well as leadership. As the lead developer of the project I was responsible for not only delivering the results, but also collaborating with the designers to discuss viability of certain features and providing guidance/mentorship to other members of the dev team.</p>
        <p>In terms of personal contributions to the project, these were the things I completed:</p>
        <ul className="list-disc pl-8">
          <li>Interfaces & styling</li>
          <li>Routing</li>
          <li>Scheduling medications & marking them as taken</li>
          <li>Automatic scanning</li>
          <li>Generating info</li>
        </ul>
        <p>And additionally:</p>
        <ul className="list-disc pl-8">
          <li>Contributed to writing & reviewing research survey</li>
          <li>Usability testing</li>
        </ul>
      </div>
      <Footer/>
    </div>
  )
}

export function Studius() {
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5">
      <Header/>
      <ToTop/>
      <ProjectHero content={"Studius is a study helper app designed for students to both learn about their study habits and find others to study with."} coverPath={"/images/studius/studius-cover.png"} title={"Studius"}/>
      <ProjectDetails
        links={[
          { url: "https://studius-app.vercel.app/", label: "Web App Mockup" },
          { url: "https://www.figma.com/proto/48H6MS2rhRlXWkWUn09mkG/MDIA-2106-%E2%80%93-StudiUs-Set-H?node-id=223-7512&t=ojJqbi0ygQHpetxL-1", label: "Figma Prototype" },
          { url: "https://github.com/jasantiaguel/studius-app", label: "Project Repo" },
          { url: "https://studi-us-style-guide.vercel.app/", label: "Branding Style Guide" }
        ]}
        tools={[
          "Next.js",
          "Figma",
          "Adobe Photoshop",
          "Adobe Illustrator"
        ]}
      />
      <div className="min-w-full">
        <div className="mb-2">
          <p className="font-bold">Takeaways</p>
        </div>
        <ul className="pl-8 list-disc grid grid-cols-1 md:grid-cols-2">
          <li>Interface design & development</li>
          <li>Usability testing, iterative process</li>
          <li>UX design</li>
          <li>Team collaboration</li>
          <li>Brand design</li>
        </ul>
      </div>
      <div className="mt-2 md:mt-6 max-w-3xl flex flex-col gap-2 md:gap-3">
        <p>Studius is a team project where we were to ideate, research, design and develop interfaces for an application idea.</p>
        <h2 className="case-header">Reflection</h2>
        <p>This experience solidified my understanding of UX design concepts such as consistency, perceivability, learnability, predictability, and feedback. It also taught me the benefits of usability testing and the iterative process.</p>
        <p>Developing this project taught me the effectiveness of atomic principles in both development and design as well as writing maintainable and scalable code.</p>
      </div>
      <Footer/>    
    </div>
  )
}

export function GraphicDesignComms() {
  const merpThumbnails = [
    "/images/graphic-design/merp/merp-thumbnail1.jpg",
    "/images/graphic-design/merp/merp-thumbnail2.jpg",
    "/images/graphic-design/merp/merp-thumbnail3.png",
    "/images/graphic-design/merp/merp-thumbnail4.png",
    "/images/graphic-design/merp/merp-thumbnail5.png",
    "/images/graphic-design/merp/merp-thumbnail6.png",
    "/images/graphic-design/merp/merp-thumbnail7.png",
    "/images/graphic-design/merp/merp-thumbnail8.png",
    "/images/graphic-design/merp/merp-thumbnail9.png",
  ]

  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      <div className="min-w-full">
        <h1 className="text-3xl md:text-6xl mb-2 md:mb-4">Graphic Design Commissions</h1>
        <p>A compilation of graphic design work done for friends & clients.</p>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <p className="text-l md:text-xl">For a friend's <Link to={"https://www.youtube.com/watch?v=Gx1JC46uWj4"}>commentary reel</Link></p>
        <img src="/images/graphic-design/jerryreel.jpg"></img>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <p className="text-l md:text-xl">For <Link to={"https://www.twitch.tv/merpkun"}>Merp</Link>'s Youtube & Twitch channels</p>
        <h3 className="text-xl md:text-xl">YouTube Thumbnails</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-2">
          {
            merpThumbnails.map((thumbnail, index) => (
              <img src={thumbnail} key={index}/>
            ))
          }
        </div>
        <h3 className="text-xl md:text-xl">Stream Elements</h3>
        <div className="flex min-w-full gap-1 md:gap-2 justify-center">
          <img src="/images/graphic-design/merp/merp-banner.png"></img>
          {/* <img src="/images/graphic-design/merp/merp-schedule2.png"></img>
          <img src="/images/graphic-design/merp/merp-schedule1.png"></img> */}
        </div>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <p className="text-l md:text-xl">Logo design for Norcal fighting game local <Link to={"https://www.start.gg/astral"}>Astral Beatdown</Link></p>
        <div className="flex">
          <img style={{maxWidth: "50%"}} src="/images/graphic-design/astral-logo.jpg"></img>
          <img style={{maxWidth: "50%"}} src="/images/graphic-design/astral-logo-b&w.svg"></img>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export function GraphicDesignProjs() {
  const content = "A compilation of various individual graphic design projects."
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      <ProjectHero coverPath={"/images/designs/cover.jpg"} content={content} title="Graphic Design Projects"/>
      <ProjectDetails tools={["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects"]}/>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 md:gap-4">
          <img src="/images/designs/motfd.png"></img>
          <img src="/images/designs/posterlong.jpg"></img>
          {/* <img src="/images/designs/slizzard.jpg"></img> */}
        </div>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <div className="flex flex-row flex-wrap justify-center gap-2 md:gap-4">
          <img src="/images/designs/inclass1.jpg"></img>
          <img style={{maxWidth: "50%"}} src="/images/designs/can_Page_3.jpg"></img>
          <video style={{maxWidth: "40%"}} controls>
            <source src="/images/designs/sleep.mp4" type="video/webm"/>
          </video>
        </div>
      </div>
      <Footer/>    
    </div>
  )
}

export function CurrencyConverter() {
  const content = "Simple currency converter web page using vanilla HTML, CSS, and Javascript";
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      <ProjectHero title={"Currency Converter"} content={content} coverPath={"/images/currency-converter/cover.jpg"}/>
      <ProjectDetails
        links={[
          { url: "https://github.com/yeenathan/currency-converter/", label: "Project Repo"}
        ]}
        tools={[
          "HTML",
          "CSS",
          "Javascript",
          "Frankfurter API"
        ]}
      />
      <Footer/>
    </div>
  )
}

export function VanGo() {
  const content = "VAN-GO! is a simple web-based game where players guess Vancouver locations on a map based on given images."
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      <ProjectHero title={"VAN-GO!"} content={content} coverPath={"/images/van-go/cover.jpg"}/>
      <ProjectDetails links={[
        {url: "https://comp3170-van-go.vercel.app/", label: "VAN-GO! Game"},
        {url: "https://github.com/jasantiaguel/comp3170-final-proj", label: "Github Repo"}
      ]}
        tools={["React.js", "Leaflet API"]}
      />
      <Footer/>
    </div>
  )
}

export function Magazine() {
  const content = "A print magazine on the architecture of the Dragon Ball universe"
  const coverPath = "/images/db-mag/cover.jpg";
  const title = "Dragon Ball: Architecture & Wonders";
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      <ProjectHero coverPath={coverPath} content={content} title={title} />
      <ProjectDetails tools={["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign"]} links={[{url: "/https://www.dropbox.com/scl/fi/umrvljjv998azi3d5v4ra/db.pdf?rlkey=xjqtsnaldnn2irzq4k2kfflwi&st=kl2c9dom&dl=0", label: "Download print PDF"}]}/>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <div className="grid grid-cols-2">
          <img src="/images/designs/db_Page_06.jpg"></img>
          <img src="/images/designs/db_Page_07.jpg"></img>
        </div>
        <div className="grid grid-cols-2">
          <img src="/images/designs/db_Page_10.jpg"></img>
          <img src="/images/designs/db_Page_11.jpg"></img>
        </div>
      </div>
      <Footer/>
    </div>
  )
}