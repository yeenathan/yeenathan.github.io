import { Link } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";

const projects = [
  {
    name: "Remedify",
    image: "/images/remedify/cover.jpg",
    route: "/remedify"
  },
  {
    name: "Studius",
    image: "/images/studius/studius-cover.png",
    route: "/studius"
  },
  {
    name: "Graphic Design Projects",
    image: "/images/graphic-design-bcit/cover.jpg",
    route: "/graphic-design-projects"
  },
  {
    name: "Graphic Design Commissions",
    image: "/images/graphic-design/cover.jpg",
    route: "/graphic-design-commissions"
  }
]

export default projects;

export function Remedify() {
  return(
    <div className="bg-neutral-900 text-zinc-300 min-h-screen">
      <div className="container mx-auto flex p-4 flex-col items-center gap-5">
        <Header/>
        <div className="flex flex-col items-start min-w-full">
          <h1 className="text-3xl md:text-6xl">Remedify</h1>
          <div className="grid grid-cols-2 my-4">
            <img src="/images/remedify/cover.jpg"/>
            <img src="/images/remedify/asclepius.jpg"/>
            <img src="/images/remedify/page.jpg"/>
            <img src="/images/remedify/figma.jpg"/>
          </div>
          <h2>Links</h2>
          <div className="flex flex-col md:flex-row md:gap-4">
            <Link to={"https://www.remedify.ca/"} target="_blank">Remedify Landing Page</Link>
            <Link to={"https://remedify-blog.vercel.app/"} target="_blank">Remedify Blog</Link>
            <Link to={"https://github.com/yeenathan/asclepius"} target="_blank">Project Repo</Link>
          </div>
        </div>
        <div className="min-w-full flex flex-col gap-2">
          <p className="italic">"Remedify aims to improve medication adherence while maintaining a low learning curve to prioritize accessibility for users. Users who are prone to polypharmacy and cognitive impairments will have a convenient reminder and easy support system in their life. In addition to our support system at the touch of your fingers, Remedify aims to empower our users by giving them full control over their schedule and medication details."</p>
          <p><span className="italic">Remedify</span> was an academic project in which we were tasked with designing and developing an app to assist an underrepresented or disadvantaged community with the use of AI tools. Teams were to organize themselves into multiple sub-teams and simulate a real-world work environment, spanning the whole semester. I was the lead developer of our team, working with two other developers.</p>
          <p>The app was developed using Expo/React Native. We also made use of Azure's cloud functions & computer vision, and OpenAI's GPT-4o mini APIs to build the main features of our app. Refer to the links above to learn more.</p>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export function Studius() {
  return(
    <div className="bg-neutral-900 text-zinc-300 min-h-screen">
      <div className="container mx-auto flex p-4 flex-col items-center gap-5">
        <Header/>
        <div className="flex flex-col items-start min-w-full">
          <h1 className="text-3xl md:text-6xl mb-2 md:mb-4">Studius</h1>
          <p><span className="italic">studiUs</span> is a study helper app designed for college students. It features a self-assessment quiz to help users find their ideal study method(s), and a study group system that can assist users with finding study buddies. </p>
          <div className="flex min-w-full justify-center my-2 md:my-4">
            <img src="/images/studius/studius-cover.png"/>
          </div>
          <h2>Links</h2>
          <div className="flex flex-col md:flex-row md:gap-4">
            <Link to={"https://studius-app.vercel.app/"} target="_blank">Web App</Link>
            <Link to={"https://www.figma.com/proto/48H6MS2rhRlXWkWUn09mkG/MDIA-2106-%E2%80%93-StudiUs-Set-H?node-id=223-7512&t=ojJqbi0ygQHpetxL-1"} target="_blank">Figma Prototype</Link>
            <Link to={"https://github.com/jasantiaguel/studius-app"} target="_blank">Project Repo</Link>
            <Link to={"https://studi-us-style-guide.vercel.app/"} target="_blank">Online Style Guide</Link>
          </div>
        </div>
        <div>
          <p className="mb-2">Academic project done in teams of 3. We were to ideate, design, test, and develop a mobile-focused web app over the course of several months. Within the team I took a lead role in the development process, while contributing meaningfully to ideas and design. This is a frontend development project, so a number of features were not implemented.</p>
          <p>From this project I learned a lot about interaction design & theory, and getting used to tools such as Figma and developing in Javascript with the Next.js framework. We originally had very ambitious ideas for our app, and we had to redefine our scope due to our timeline and abilities. As a result we cut out many things that we would have loved to have added.</p>
        </div>
        <Footer/>    
      </div>
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
    <div className="bg-neutral-900 text-zinc-300 min-h-screen">
      <div className="container mx-auto flex p-4 flex-col items-center gap-5 md:gap-8">
        <Header/>
        <div className="min-w-full">
          <h1 className="text-3xl md:text-6xl mb-2 md:mb-4">Graphic Design Commissions</h1>
          <p>A compilation of graphic design work done for friends & clients. I use a combination of Adobe Photoshop, Illustrator, and InDesign.</p>
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
    </div>
  )
}

export function GraphicDesignProjs() {
  return(
    <div className="bg-neutral-900 text-zinc-300 min-h-screen">
      <div className="container mx-auto flex p-4 flex-col items-center gap-5 md:gap-8">
        <Header/>
        <div className="min-w-full">
          <h1 className="text-3xl md:text-6xl mb-2 md:mb-4">Graphic Design</h1>
          <p>A compilation of various academic graphic design projects.</p>
        </div>
        <Footer/>    
      </div>
    </div>
  )
}