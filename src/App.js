import { useNavigate, Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import Header from "./components/Header.js"
import Hero from "./components/Hero.js"
import projects from "./projects.js"
import ToTop from "./components/ToTop.js";

export default function App() {
  const navigate = useNavigate();
  const ref = useRef(null);
  
  function MyProjects ({projects}) {
    return(
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 md:my-4">
        {
          projects.map((project) => {
            return(
              <div className="flex flex-col items-end" style={{cursor: "pointer"}} onClick={() => navigate(project.route)}>
                <img className="project-cover hover:opacity-80" src={project.image}/>
                <h4 className="text-sky-50 text-xl md:text-2xl subhead mt-1.5">{project.name}</h4>
              </div>
            )
          })
        }
      </div>
    )
  }

  function Filter({label, category}) {
    return(
      <button style={filter===category?{color:"#48cbff"}:null} className="text-xl" onClick={() => setFilter(category)}>
        {label}
      </button>
    )
  }

  function doFilter(filter) {
    if (filter === "all") return projects;
    return projects.filter((project) => {
      return project.type === filter;
    })
  }

  const [filter, setFilter] = useState("dev");
  const [filterProjects, setFilterProjects] = useState(doFilter(filter));
  
  useEffect(() => {
    setFilterProjects(doFilter(filter));
  }, [filter])

  return (
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 text-zinc-100">
      <Header/>
      <ToTop/>
      <Hero projectRef={ref}/>
      <div ref={ref} className="min-w-full flex flex-col gap-2">
        <h3 className="text-2xl md:text-4xl">Projects</h3>
        <div className="flex flex-row gap-4">
          <Filter label="All" category="all"/>
          <Filter label="Development" category="dev"/>
          <Filter label="Graphic Design" category="gd"/>
        </div>
        <MyProjects projects={filterProjects}/>
      </div>
    </div>
  )
}