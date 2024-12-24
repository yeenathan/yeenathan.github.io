import { useNavigate } from "react-router";
import Footer from "./components/Footer.js";
import "./index.css";
import projects from "./projects.js"

export default function App() {
  const navigate = useNavigate();
  
  const myProjects = (
    <div className="flex flex-col gap-3 py-4">
      {
        projects.map((project) => {
          return(
            <div className="flex flex-col items-end hover:opacity-80" style={{cursor: "pointer"}} onClick={() => navigate("/remedify")}>
              <img className="border-2 border-sky-600" src={project.image}/>
              <h3 className="text-xl md:text-2xl">{project.name}</h3>
            </div>
          )
        })
      }
    </div>
  )

  return (
    <div className="bg-neutral-900 text-zinc-100 min-h-screen">
      <div className="container mx-auto flex p-4 flex-col items-center gap-5">
        <header className="flex justify-end items-center min-w-full">
          <p>-</p>
        </header>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-6xl">Nathan Yee</h1>
          <p className="text-l md:text-2xl">Web Design/Development</p>
          <p className="text-l md:text-2xl">Graphic Design</p>
        </div>
        <div className="min-w-full">
          <h2 className="text-2xl md:text-4xl">Projects</h2>
          {myProjects}
        </div>
        <Footer/>
      </div>
    </div>
  )
}