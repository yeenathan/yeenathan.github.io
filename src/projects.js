import { Link } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";

const projects = [
  {
    name: "Remedify",
    image: "/images/remedify/cover.jpg"
  },
  // {
  //   name: "Graphic Design",
  //   image: "/images/remedify.jpg"
  // },
  // {
  //   name: "Studius",
  //   image: "/images/remedify.jpg"
  // }
]

export default projects;

export function Remedify() {
  return(
    <div className="bg-neutral-900 text-zinc-300 min-h-screen">
      <div className="container mx-auto flex p-4 flex-col items-center gap-5">
        <Header/>
        <div className="flex flex-col items-start">
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
          <p><span className="italic">Remedify</span> was an academic project in which we were tasked with designing and developing an app to assist an underrepresented or disadvantaged community with the use of AI tools. Teams were to organize themselves into multiple sub-teams and simulate a real-world work environment. I was the lead developer of our team, working with two other developers.</p>
          <p>The app was developed using Expo/React Native. We also made use of Azure's cloud functions & computer vision, and OpenAI's GPT-4o mini APIs to build the main features of our app. Refer to the links above to learn more.</p>
        </div>
        <Footer/>
      </div>
    </div>
  )
}