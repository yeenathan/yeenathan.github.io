import { Link } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import ToTop from "./components/ToTop";

const projects = [
  {
    name: "Remedify",
    image: "/images/remedify/cover.jpg",
    route: "/remedify",
    type: "dev"
  },
  {
    name: "Studius",
    image: "/images/studius/studius-cover.png",
    route: "/studius",
    type: "dev"
  },
  {
    name: "Graphic Design Projects",
    image: "/images/graphic-design-bcit/cover.jpg",
    route: "/graphic-design-projects",
    type: "gd"
  },
  {
    name: "VAN-GO",
    image: "/images/van-go/cover.jpg",
    route: "/van-go",
    type: "dev"
  },
  {
    name: "Graphic Design Commissions",
    image: "/images/graphic-design/cover.jpg",
    route: "/graphic-design-commissions",
    type: "gd"
  }
]

export default projects;

function ProjectDetails({links, tools}) {
  return(
    <div className="flex flex-col gap-2 md:gap-3">
      <h2 className="subhead font-normal text-xl md:text-2xl">Details</h2>
      { links && 
        <div className="flex flex-col md:flex-row md:gap-4">
        {
          links.map((link, key) => {
            return <Link to={link.url} target="_blank" key={key}>{link.label}</Link>
          })
        }
      </div>
      }
      <h3>Tools used</h3>
      <ul className="pl-8 list-disc grid grid-cols-2">
        {
          tools.map((tool, key) => {
            return <li key={key}>{tool}</li>
          })
        }
      </ul>
      
    </div>
  )
}

export function Remedify() {
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5">
      <Header/>
      <ToTop/>
      <div className="flex flex-col items-start min-w-full">
        <h1 className="text-3xl md:text-6xl mb-2 md:mb-4">Remedify</h1>
        <p className="italic">"Remedify aims to improve medication adherence while maintaining a low learning curve to prioritize accessibility. People who are prone to polypharmacy and cognitive impairments will have a convenient reminder and easy support system in their life. In addition to our support system at the touch of your fingers, Remedify aims to empower our users by giving them full control over their schedule and medication details."</p>
        <div className="grid grid-cols-2 my-4">
          <img src="/images/remedify/cover.jpg"/>
          <img src="/images/remedify/asclepius.jpg"/>
          <img src="/images/remedify/page.jpg"/>
          <img src="/images/remedify/figma.jpg"/>
        </div>
        <ProjectDetails
          links={[
            { url: "https://www.remedify.ca/", label: "Remedify Landing Page" },
            { url: "https://remedify-blog.vercel.app/", label: "Remedify Blog" },
            { url: "https://github.com/yeenathan/asclepius", label: "Project Repo" }
          ]}
          tools={[
            "Expo/React Native",
            "Kitten UI",
            "Azure cloud functions",
            "Azure Computer Vision (OCR)",
            "OpenAI GPT-4o mini"
          ]}
        />
      </div>
      <div className="min-w-full flex flex-col gap-2 md:gap-3">
        <p><span className="italic">Remedify</span> was an academic project in which we were tasked with designing and developing an app to assist an underrepresented or disadvantaged community with the use of AI tools. Teams were to organize themselves into multiple sub-teams and simulate a real-world work environment, spanning the whole semester. I was the lead developer of our team, working with two other developers.</p>
        <p>The app was developed using Expo/React Native. We also made use of Azure's cloud functions & computer vision, and OpenAI's GPT-4o mini APIs to build the main features of our app. Refer to the links above to learn more.</p>
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
      <div className="flex flex-col items-start min-w-full">
        <h1 className="text-3xl md:text-6xl mb-2 md:mb-4">Studius</h1>
        <p><span className="italic">studiUs</span> is a study helper app designed for college students. It features a self-assessment quiz to help users find their ideal study method(s), and a study group system that can assist users with finding study buddies. </p>
        <div className="flex min-w-full justify-center my-2 md:my-4">
          <img src="/images/studius/studius-cover.png"/>
        </div>
        <ProjectDetails
          links={[
            { url: "https://studius-app.vercel.app/", label: "Web App Mockup" },
            { url: "https://www.figma.com/proto/48H6MS2rhRlXWkWUn09mkG/MDIA-2106-%E2%80%93-StudiUs-Set-H?node-id=223-7512&t=ojJqbi0ygQHpetxL-1", label: "Figma Prototype" },
            { url: "https://github.com/jasantiaguel/studius-app", label: "Project Repo" },
            { url: "https://studi-us-style-guide.vercel.app/", label: "Online Style Guide/Case Study" }
          ]}
          tools={[
            "Next.js",
            "Figma",
            "Adobe Photoshop",
            "Adobe Illustrator"
          ]}
        />
      </div>
      <div>
        <p className="mb-2">Academic project done in teams of 3. We were to ideate, design, test, and develop a mobile-focused web app over the course of several months. Within the team I took a lead role in the development process, while contributing meaningfully to ideas and design. This is a frontend development project, so a number of features were not implemented.</p>
        <p>From this project I learned a lot about interaction design & theory, and getting used to tools such as Figma and developing in Javascript with the Next.js framework. We originally had very ambitious ideas for our app, and we had to redefine our scope due to our timeline and abilities. As a result we cut out many things that we would have loved to have added.</p>
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
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      <div className="min-w-full">
        <h1 className="text-3xl md:text-6xl mb-2 md:mb-4">Graphic Design</h1>
        <p>A compilation of various academic graphic design projects.</p>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <p className="text-l md:text-xl">Various poster designs</p>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          <img src="/images/graphic-design-bcit/motfd.png"></img>
          <img src="/images/graphic-design-bcit/poster.jpg"></img>
          <img src="/images/graphic-design-bcit/slizzard.jpg"></img>
        </div>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <p className="text-l md:text-xl">A print magazine on the architecture of the Dragon Ball universe. <Link to={"/https://www.dropbox.com/scl/fi/umrvljjv998azi3d5v4ra/db.pdf?rlkey=xjqtsnaldnn2irzq4k2kfflwi&st=kl2c9dom&dl=0"}>Download</Link> for optimal viewing.</p>
        <div className="grid grid-cols-2">
          <img src="/images/graphic-design-bcit/db_Page_06.jpg"></img>
          <img src="/images/graphic-design-bcit/db_Page_07.jpg"></img>
        </div>
        <div className="grid grid-cols-2">
          <img src="/images/graphic-design-bcit/db_Page_10.jpg"></img>
          <img src="/images/graphic-design-bcit/db_Page_11.jpg"></img>
        </div>
      </div>
      <div className="flex flex-col min-w-full gap-1 md:gap-2">
        <p className="text-l md:text-xl">Misc</p>
        <div className="flex flex-row flex-wrap justify-center gap-1 md:gap-2">
          <img src="/images/graphic-design-bcit/inclass1.jpg"></img>
          <img style={{maxWidth: "50%"}} src="/images/graphic-design-bcit/can_Page_3.jpg"></img>
          <video style={{maxWidth: "40%"}} controls>
            <source src="/images/graphic-design-bcit/sleep.mp4" type="video/webm"/>
          </video>
        </div>
      </div>
      <Footer/>    
    </div>
  )
}

export function VanGo() {
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <h1>VAN-GO</h1>
      <ToTop/>
      <Footer/>
    </div>
  )
}