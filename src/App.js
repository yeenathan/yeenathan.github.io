import { useNavigate, Link } from "react-router";
import { useRef } from "react";
import "./index.css";
import Header from "./components/Header.js"
import Hero from "./components/Hero.js"
import projects from "./projects.js"

export default function App() {
  const navigate = useNavigate();
  const ref = useRef(null);

  function scroll() {
    ref.current.scrollIntoView();
  }
  
  const myProjects = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
      {
        projects.map((project) => {
          return(
            <div className="flex flex-col items-end hover:opacity-80" style={{cursor: "pointer"}} onClick={() => navigate(project.route)}>
              <img className="border-2 border-sky-600 rounded-xl" src={project.image}/>
              <h3 className="text-sky-50 text-xl md:text-2xl">{project.name}</h3>
            </div>
          )
        })
      }
    </div>
  )

  return (
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 text-zinc-100">
      <Header/>
      <Hero scroll={scroll}/>
      <div ref={ref} className="min-w-full">
        <h2 className="text-2xl md:text-4xl">Projects</h2>
        {myProjects}
      </div>
    </div>
  )
}