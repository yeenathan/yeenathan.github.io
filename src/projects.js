import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import ToTop from "./components/ToTop";
import ProjectHero from "./components/ProjectHero";
import ProjectDetails from "./components/ProjectDetails";
import Code from "./components/Code";
import { useRef, useState } from "react";
import MyImage from "./components/MyImage";
import Gallery from "./components/Gallery";
import { getRouteImages } from "./utils/getRouteImages";

const projects = [
  {
    name: "SomaSync",
    image: "/images/somasync/somasync.jpg",
    route: "/somasync",
    type: "dev",
    tags: ["AWS Lightsail", "WP API", "php", "React", "Typescript", "Authentication"]
  },
  {
    name: "Remedify",
    image: "/images/remedify/cover.jpg",
    route: "/remedify",
    type: "dev",
    tags: ["React Native", "Azure", "OpenAI", "Case Study"]
  },
  {
    name: "Studius",
    image: "/images/studius/studius-cover.png",
    route: "/studius",
    type: "dev gd",
    tags: ["React", "UX/UI", "Branding", "Figma", "Prototyping", "Case Study"]
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
    name: "Graphic Design",
    image: "/images/designs/cover.jpg",
    route: "/designs",
    type: "gd",
    tags: ["Poster design", "Package design", "Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects"]
  },
  {
    name: "Digital Design Commissions",
    image: "/images/graphic-design/cover.jpg",
    route: "/graphic-design-commissions",
    type: "gd",
    tags: ["Thumbnail design", "Social media promotion & assets", "Adobe Photoshop", "Adobe Illustrator"]
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

export function Somasync() {
  const [showGallery, setShowGallery] = useState(false);

  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      {
        showGallery &&
        <Gallery images={getRouteImages()} setShowModal={setShowGallery}></Gallery>
      }
      <ProjectHero title={"SomaSync"} content={"SomaSync is a psychological health and safety learning web application"} coverPath={"/images/somasync/somasync.jpg"}/>
      <ProjectDetails links={[
        {url: "https://main.d2mh04uaf5zcbb.amplifyapp.com/login", label: "Deployed App"},
        {url: "https://github.com/yeenathan/SomaSync", label: "Github Repo"}
      ]}
        tools={["React.js", "Typescript", "AWS Lightsail", "AWS Amplify", "Wordpress REST API", "php"]}
      />
      <div className="max-w-3xl mx-auto">
        <p>A psychological health and safety learning web application I worked on over a little under 2 months for my practicum. Learned a lot about deployment and back-end systems as it was my first exposure to many tools.</p>
      </div>
      <Footer/>
    </div>
  )
}

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

  const reflection = useRef();

  const content = "Remedify is a medication reminder app dedicated to accessibility and ensuring medical adherance."

  const [showGallery, setShowGallery] = useState(false);

  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5">
      <Header/>
      <ToTop/>
      {
        showGallery &&
        <Gallery images={getRouteImages()} setShowModal={setShowGallery}></Gallery>
      }
      <ProjectHero title={"Remedify"} coverPath={"/images/remedify/cover.jpg"} content={content}/>
      <ProjectDetails
        links={[
          { url: "https://github.com/yeenathan/asclepius", label: "Github Repo" },
          { url: "https://www.remedify.ca/", label: "Remedify Landing Page" },
          // { url: "https://remedify-blog.vercel.app/", label: "Remedify Blog" }
          { url: "https://docs.google.com/document/d/1MGyxeF7pkwpVo4VsNl829hrDaSTTYn5Frfa2RREm4Nc/edit?tab=t.0", label: "Research Document"}
        ]}
        tools={[
          "Expo/React Native",
          "Azure cloud functions & blob storage",
          "Azure Computer Vision (OCR)",
          "OpenAI GPT-4o mini",
          "Canadian Drug Product Database (DPD)"
        ]}
        remedify={true}
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
      {/* <div className="flex flex-col justify-start min-w-full">
        <p><strong>Role:</strong> Lead developer, research & validation</p>
        <p><strong>Timeline:</strong> 3 months</p>
      </div> */}

      <div className="mt-2 md:mt-6 max-w-full md:max-w-3xl flex flex-col gap-2 md:gap-3">
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          <MyImage className="rounded" src="/images/remedify/scanning.jpg" setShowGallery={setShowGallery}/>
          <MyImage className="rounded" src="/images/remedify/homepage.jpg" setShowGallery={setShowGallery}/>
          <MyImage className="rounded" src="/images/remedify/info.jpg" setShowGallery={setShowGallery}/>
        </div>

        <h2 className="case-header">Context</h2>
        <p>Only about 50% of prescribed medications are taken as directed by patients with chronic illnesses. Research identifies two key reasons: misunderstanding of medication instructions and forgetfulness.</p>
        <p>Remedify is an AI-powered medication reminder app that bridges the gap in adherence, making health management easier and more efficient. Going beyond the capabilities of a standard pillbox, Remedify is designed for individuals facing cognitive challenges or managing multiple medications, where the risk of misdosing is high. With a strong focus on accessibility and adherence, the app offers a reminder and a comprehensive medication library to support users in staying on track with their health.</p>
        <h2 className="case-header">Key Features</h2>
        <p>The app boasts two main features to assist patients with medical adherence while being as accessible as possible.</p>
          
        <p className="font-bold">Automated scanning</p>
        <MyImage setShowGallery={setShowGallery} src="/images/remedify/app1.jpg" style={{border: "2px solid #272727"}}/>
        <p className="mb-2 md:mb-4">Automated med scanning while cross-referencing the Canadian Drug Product Database (DPD) for accessibility and accuracy. This feature enforces our focus on accessibility by simplifying the interaction to add a medication to the app.</p>
        
        <p>The automatic scanning feature starts with <strong className="text-sky-200">Azure AI Vision OCR</strong>, specifically the Read API. Image data is uploaded using blob storage via a SAS URL so to be used by the OCR function.</p>
        <Code text={generateSASUrl} title={"generateSASUrl (cloud function)"} />
        <Code text={doOCR} title={"doOCR (cloud function)"} />
        <Code text={uploadCode} title={"Calling the cloud functions"} link={"https://github.com/yeenathan/Asclepius/blob/main/app/components/UploadImg.js"}/>

        <p className="font-bold mt-2">Providing Information and Generated Insights</p>
        <MyImage setShowGallery={setShowGallery} src="/images/remedify/app2.jpg" style={{border: "2px solid #272727"}}/>
        <p>AI generated insights and additional information based on information fetched from DPD API. By providing this information, this feature addresses one of the main reasons for low medication adherence: confusion.</p>
        
        <p><strong className="text-sky-200">OpenAI's GPT-4o mini</strong> is used to parse the text data from OCR into a usable object as well as generate insights, such as side effects, using data fetched from the <a to={"/https://www.canada.ca/en/health-canada/services/drugs-health-products/drug-products/drug-product-database.html"}>Canadian Drug Database (DPD)</a> API.</p>
        <p>Due to time constraints, the OpenAI API implementation is done locally with a .env, rather than through a cloud function like the functions OCR above.</p>
        <Code text={OpenAiParser} title={"Parsing text to object"} link={"https://github.com/yeenathan/Asclepius/blob/main/app/components/OpenAIParser.js"}/>
        <Code text={dinInfo} title={"Fetching data from DPD"} link={"https://github.com/yeenathan/Asclepius/blob/main/app/pages/new-hifi/FormScreen.js"}/>
        <Code text={OpenAIGenerate} title={"Generating insights based on DPD"} link={"https://github.com/yeenathan/Asclepius/blob/main/app/components/OpenAIGetInfo.js"}/>
      
        <h2 className="case-header">Research & Validation</h2>
        <p>A survey and numerous interviews were conducted by members of the team to refine and validate the app's ideas and to help craft the user personas.</p>
        
        <iframe width={"100%"} height={600} src="https://embed.figma.com/design/eqiBsR991DWqKMuktHQb1P/Persona?node-id=64-4&embed-host=share" ></iframe>
        
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
        <a href="https://docs.google.com/document/d/1MGyxeF7pkwpVo4VsNl829hrDaSTTYn5Frfa2RREm4Nc/edit?tab=t.0" target="_blank">Read the full user findings document</a>
        
        <h2 className="case-header" ref={reflection}>Reflection</h2>
        <MyImage setShowGallery={setShowGallery} src="/images/remedify/asclepius.jpg" className="max-w-full"/>

        <p>This project provided me with invaluable experiences in development, working within a team, as well as leadership. As the lead developer of the project I was responsible for not only delivering the results, but also collaborating with the designers to discuss viability of certain features and providing guidance/mentorship to other members of the dev team.</p>
        <p>Some challenges included learning new tools along the way, and initially, delegating work to my team because of unfamiliarity with their skillsets. However with a supportive team culture we were able to tackle problems early on and cover for each others' weaknesses.</p>
        {/* <p>In terms of personal contributions to the project, these were the things I completed:</p>
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
        </ul> */}
      </div>
      <Footer/>
    </div>
  )
}

export function Studius() {
  const reflection = useRef();
  const [showGallery, setShowGallery] = useState(false);

  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5">
      <Header/>
      <ToTop/>
      {
        showGallery &&
        <Gallery images={getRouteImages()} setShowModal={setShowGallery}></Gallery>
      }
      <ProjectHero content={"Studius is a study helper app designed for students to both learn about their study habits and find others to study with."} coverPath={"/images/studius/studius-cover.png"} title={"Studius"}/>
      <ProjectDetails
        links={[
          { url: "https://github.com/jasantiaguel/studius-app", label: "Github Repo" },
          { url: "https://studius-app.vercel.app/", label: "Web App Mockup" },
          { url: "https://www.figma.com/proto/48H6MS2rhRlXWkWUn09mkG/MDIA-2106-%E2%80%93-StudiUs-Set-H?node-id=223-7512&t=ojJqbi0ygQHpetxL-1", label: "Figma Prototype" },
          { url: "https://studi-us-style-guide.vercel.app/", label: "Branding Style Guide" },
          { url: "https://docs.google.com/document/d/1frDEKZwsNvP9bPvJhrAL7fmk1ME5Xzkh8s9i74SIsnM/edit?tab=t.0", label: "Usability testing document"}
        ]}
        tools={[
          "Next.js",
          "Figma",
          "Adobe Photoshop",
          "Adobe Illustrator"
        ]}
        studius={true}
      />
      <div className="min-w-full">
        <div className="mb-2">
          <p className="font-bold">Takeaways</p>
          <a onClick={() => reflection.current.scrollIntoView()} style={{cursor: "pointer"}}>Read reflection</a>
        </div>
        <ul className="pl-8 list-disc grid grid-cols-1 md:grid-cols-2">
          <li>Interface design & development</li>
          <li>State management</li>
          <li>Usability testing, iterative process</li>
          <li>UX design</li>
          <li>Team collaboration</li>
          <li>Brand design</li>
        </ul>
      </div>
      <div className="mt-2 md:mt-6 max-w-3xl flex flex-col gap-2 md:gap-3">
        <h2 className="case-header">Concept</h2>
        <iframe width={"100%"} height={400} src="https://embed.figma.com/board/wh3ZXZtqq39bybt72mY98L/StudiUs-A3Inventory?node-id=0-1&embed-host=share" ></iframe>
        <iframe width={"100%"} height={300} src="https://embed.figma.com/board/bhOpTVTiAeJDi82TcyUTKe/StudiUs-A2UserPersona?node-id=0-1&embed-host=share" ></iframe>
        <p>Studius is intended for a variety of students, ranging from those who are seeking or providing mentorship, returning students seeking professional connections, and students who may just have trouble finding friends. In other words, Studius is about connecting students together.</p>
        <a href="https://studi-us-style-guide.vercel.app/" target="_blank">Refer to the online style guide for branding details.</a>
        <h2 className="case-header">Initial Iteration</h2>
        <p className="font-bold">Lo-fi</p>
        <iframe width={"100%"} height={600} src="https://embed.figma.com/design/48H6MS2rhRlXWkWUn09mkG/MDIA-2106-%E2%80%93-StudiUs-Set-H?node-id=168-3447&embed-host=share" ></iframe>
        <p>An initial prototype was created for testing purposes from this mock up. Findings are reported in the <a href="https://www.figma.com/proto/48H6MS2rhRlXWkWUn09mkG/MDIA-2106-%E2%80%93-StudiUs-Set-H?node-id=1722-6749&t=sERZkiK9TtDPSZfD-1" target="_blank">usability testing report</a>.</p>
        <p>The design was iterated on based on this testing report and other feedback.</p>
        <h2 className="case-header">Final Hi-fi Mock Up</h2>
        <iframe width={"100%"} height={600} src="https://embed.figma.com/design/48H6MS2rhRlXWkWUn09mkG/MDIA-2106-%E2%80%93-StudiUs-Set-H?node-id=223-7512&embed-host=share" ></iframe>
        <h2 className="case-header">Prototype</h2>
        <iframe width={"100%"} height={600} src="https://embed.figma.com/proto/48H6MS2rhRlXWkWUn09mkG/MDIA-2106-%E2%80%93-StudiUs-Set-H?node-id=425-30829&starting-point-node-id=425%3A30829&embed-host=share" ></iframe>
        <h2 className="case-header">Development</h2>
        <p>A web mockup with functional interface was developed and deployed at the end of the design phase.</p>
        <a href="https://studius-app.vercel.app/" target="_blank">View the Studius web mock up</a>
        <a href="https://github.com/jasantiaguel/studius-app" target="_blank">Github repository</a>
        <h2 className="case-header" ref={reflection}>Reflection</h2>
        <p>This experience solidified my understanding of UX design concepts such as consistency, perceivability, learnability, predictability, and feedback. It also taught me the benefits of usability testing and the iterative process. It was my first time tackling on a project like this.</p>
        <p>Developing the web mockup taught me the effectiveness of atomic principles in both development and design, and also re-enforced my understanding of React fundamentals, such as managing state and writing re-useable components. As the stronger developer of the team, I would also provide insights and mentorship to my teammates and ensure their successes for that aspect.</p>
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
  const [showGallery, setShowGallery] = useState(false);

  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      <div className="min-w-full">
        <h1 className="text-3xl md:text-6xl mb-2 md:mb-4">Digital Design Commissions</h1>
        <p>A compilation of graphic design work done for friends & clients.</p>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <p className="text-l md:text-xl">For a friend's <a to={"https://www.youtube.com/watch?v=Gx1JC46uWj4"}>commentary reel</a></p>
        <MyImage setShowGallery={setShowGallery} src="/images/graphic-design/jerryreel.jpg"></MyImage>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <p className="text-l md:text-xl">For <a to={"https://www.twitch.tv/merpkun"}>Merp</a>'s Youtube & Twitch channels</p>
        <h3 className="text-xl md:text-xl">YouTube Thumbnails</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-2">
          {
            merpThumbnails.map((thumbnail, index) => (
              <MyImage setShowGallery={setShowGallery} src={thumbnail} key={index}/>
            ))
          }
        </div>
        <h3 className="text-xl md:text-xl">Stream Elements</h3>
        <div className="flex min-w-full gap-1 md:gap-2 justify-center">
          <MyImage setShowGallery={setShowGallery} src="/images/graphic-design/merp/merp-banner.png"></MyImage>
          {/* <MyImage setShowGallery={setShowGallery} src="/images/graphic-design/merp/merp-schedule2.png"></MyImage>
          <MyImage setShowGallery={setShowGallery} src="/images/graphic-design/merp/merp-schedule1.png"></MyImage> */}
        </div>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <p className="text-l md:text-xl">Logo design for Norcal fighting game local <a to={"https://www.start.gg/astral"}>Astral Beatdown</a></p>
        <div className="flex">
          <MyImage setShowGallery={setShowGallery} style={{maxWidth: "50%"}} src="/images/graphic-design/astral-logo.jpg"></MyImage>
          <MyImage setShowGallery={setShowGallery} style={{maxWidth: "50%"}} src="/images/graphic-design/astral-logo-b&w.svg"></MyImage>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export function GraphicDesignProjs() {
  const content = "A compilation of various individual graphic design projects."
  const [showGallery, setShowGallery] = useState(false);

  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      {
        showGallery &&
        <Gallery images={getRouteImages()} setShowModal={setShowGallery}></Gallery>
      }
      <ProjectHero coverPath={"/images/designs/cover.jpg"} content={content} title="Graphic Design Projects"/>
      <ProjectDetails tools={["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects"]}/>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 md:gap-4">
          <MyImage setShowGallery={setShowGallery} src="/images/designs/motfd.png"></MyImage>
          <MyImage setShowGallery={setShowGallery} src="/images/designs/posterlong.jpg"></MyImage>
          {/* <MyImage setShowGallery={setShowGallery} src="/images/designs/slizzard.jpg"></MyImage> */}
        </div>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <div className="flex flex-row flex-wrap justify-center gap-2 md:gap-4">
          <MyImage setShowGallery={setShowGallery} src="/images/designs/inclass1.jpg"></MyImage>
          <MyImage setShowGallery={setShowGallery} style={{maxWidth: "50%"}} src="/images/designs/can_Page_3.jpg"></MyImage>
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
  const [showGallery, setShowGallery] = useState(false);

  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      {
        showGallery &&
        <Gallery images={getRouteImages()} setShowModal={setShowGallery}></Gallery>
      }
      <ProjectHero title={"Currency Converter"} content={content} coverPath={"/images/currency-converter/cover.jpg"}/>
      <ProjectDetails
        links={[
          { url: "https://github.com/yeenathan/currency-converter/", label: "Github Repo"}
        ]}
        tools={[
          "HTML",
          "CSS",
          "Javascript",
          "Frankfurter API"
        ]}
      />
      <div className="min-w-full">
        <div className="max-w-3xl mx-auto">
          <p>Simple web app to practice integrating APIs with vanilla JS and implementing basic front-end interactions.</p>
        </div>
        <h2 className="case-header">Demo Videos</h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2">
            <video controls>
              <source src="/images/currency-converter/cc-demo.mp4" type="video/webm"/>
            </video>
            <video controls>
              <source src="/images/currency-converter/cc-demo2.mp4" type="video/webm"/>
            </video>
          </div>
      </div>
      <Footer/>
    </div>
  )
}

export function VanGo() {
  const content = "VAN-GO! is a simple web-based game where players guess Vancouver locations on a map based on given images."
  const [showGallery, setShowGallery] = useState(false);

  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      {
        showGallery &&
        <Gallery images={getRouteImages()} setShowModal={setShowGallery}></Gallery>
      }
      <ProjectHero title={"VAN-GO!"} content={content} coverPath={"/images/van-go/cover.jpg"}/>
      <ProjectDetails links={[
        {url: "https://comp3170-van-go.vercel.app/", label: "VAN-GO! Game"},
        {url: "https://github.com/jasantiaguel/comp3170-final-proj", label: "Github Repo"}
      ]}
        tools={["React.js", "Leaflet API", "Git/Github"]}
      />
      <div className="max-w-3xl mx-auto">
        <p>A simple web-based game built to practice routing and implementing CRUD operations using React.js, as well as version control with git/Github.</p>
      </div>
      <Footer/>
    </div>
  )
}

export function Magazine() {
  const content = "A print magazine on the architecture of the Dragon Ball universe"
  const coverPath = "/images/db-mag/cover.jpg";
  const title = "Dragon Ball: Architecture & Wonders";
  const [showGallery, setShowGallery] = useState(false);

  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      {
        showGallery &&
        <Gallery images={getRouteImages()} setShowModal={setShowGallery}></Gallery>
      }
      <ProjectHero coverPath={coverPath} content={content} title={title} />
      <ProjectDetails tools={["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "ChatGPT (content)"]}
        links={[
          {url: "https://www.dropbox.com/scl/fi/umrvljjv998azi3d5v4ra/db.pdf?dl=1", label: "Download full print PDF"},
          {url: "https://www.dropbox.com/scl/fi/vr4d1z27wapx0hlwumctb/db-mag.zip?dl=1", label: "Download INDD package"}
        ]}
      />
      <div className="mt-2 md:mt-6 max-w-full md:max-w-3xl flex flex-col gap-2 md:gap-3">
        <p>With print in mind, the magazine design takes inspiration from Akira Toriyama's <span className="italic">Dragon Ball</span> manga series. Proper use of grids, styles, swatches, etc. ensures visual consistency and coherence.</p>
        <p>Assets are borrowed from online <span className="italic">Dragon Ball</span> manga panels and/or recreated in Illustrator.</p>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <div className="grid grid-cols-2">
          <MyImage setShowGallery={setShowGallery} src="/images/designs/db_Page_06.jpg"></MyImage>
          <MyImage setShowGallery={setShowGallery} src="/images/designs/db_Page_07.jpg"></MyImage>
        </div>
        <div className="grid grid-cols-2">
          <MyImage setShowGallery={setShowGallery} src="/images/designs/db_Page_10.jpg"></MyImage>
          <MyImage setShowGallery={setShowGallery} src="/images/designs/db_Page_11.jpg"></MyImage>
        </div>
      </div>
      <Footer/>
    </div>
  )
}