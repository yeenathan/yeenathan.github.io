import { useNavigate, Link } from "react-router";
import "./index.css";
import projects from "./projects.js"

export default function App() {
  const navigate = useNavigate();
  
  const myProjects = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
      {
        projects.map((project) => {
          return(
            <div className="flex flex-col items-end hover:opacity-80" style={{cursor: "pointer"}} onClick={() => navigate(project.route)}>
              <img className="border-2 border-sky-600" src={project.image}/>
              <h3 className="text-sky-50 text-xl md:text-2xl">{project.name}</h3>
            </div>
          )
        })
      }
    </div>
  )

  return (
    <div className="bg-neutral-900 text-zinc-100 min-h-screen">
      <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5">
        <header className="flex justify-center md:justify-start items-center min-w-full">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-6xl">Nathan Yee</h1>
            <p className="text-l md:text-2xl">Web Design/Development & Graphic Design</p>
          </div>
        </header>
        <div className="flex justify-center md:justify-start min-w-full">
          <p className="text-center md:text-left">Hi! I'm a frontend developer and graphic designer based in Vancouver. I am passionate about food and gaming :P</p>
        </div>
        <div className="flex flex-col items-start gap-1 min-w-full">
          <h3>Get in touch with me:</h3>
          <div className="flex flex-col pl-8">
            <Link to={"https://github.com/yeenathan/"} target="_blank">Github</Link>
            <Link to={"https://www.linkedin.com/in/yeenathan/"} target="_blank">LinkedIn</Link>
            <p>yeenathan21@gmail.com</p>
          </div>
        </div>
        <div className="min-w-full">
          <h2 className="text-2xl md:text-4xl">Projects</h2>
          {myProjects}
        </div>
      </div>
    </div>
  )
}