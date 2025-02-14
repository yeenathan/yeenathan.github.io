import { Link, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import Header from "./components/Header.js"
import Hero from "./components/Hero.js"
import projects from "./projects.js"
import ToTop from "./components/ToTop.js";
import Footer from "./components/Footer.js";

export default function App({state}) {
  const ref = useRef(null);
  
  function MyProjects ({projects}) {
    return(
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-2 lg:my-4">
        {
          projects.map((project) => {
            return(
              <Link className="flex flex-col items-end" style={{cursor: "pointer"}} to={project.route}>
                <img className="project-cover" src={project.image}/>
                <ul className="pl-2 min-w-full flex flex-row flex-wrap justify-end gap-2 lg:gap-3 gap-y-0 lg:gap-y-0">
                  {
                    project.tags.map((tag, key) => {
                      return(
                        <li className="tag" key={key}>{tag}</li>
                      )
                    })
                  }
                </ul>
                <h4 className="text-sky-50 text-xl md:text-2xl subhead">{project.name}</h4>
              </Link>
            )
          })
        }
      </div>
    )
  }

  function Filter({label, category}) {
    return(
      <button style={filter===category?{color:"#48cbff"}:null} className="text-xl transition hover:scale-105" onClick={() => setFilter(category)}>
        {label}
      </button>
    )
  }

  function doFilter(filter) {
    if (filter === "all") return projects;
    return projects.filter((project) => {
      return project.type.includes(filter);
    })
  }

  const category = new URLSearchParams(window.location.search).get("category");

  const [filter, setFilter] = useState(category || "all");
  const [filterProjects, setFilterProjects] = useState(doFilter(filter));

  const location = useLocation();

  useEffect(() => {
    setFilterProjects(doFilter(filter));
  }, [filter])

  useEffect(() => {
    if (location.state && location.state.toProjects) {
      ref.current.scrollIntoView();
    }
  }, [])

  return (
    <div className="container mx-auto flex px-4 pt-8 pb-16 flex-col items-center gap-5">
      <Header/>
      <ToTop/>
      <Hero projectRef={ref} category={category}/>
      <div ref={ref} className="min-w-full flex flex-col gap-2 pt-4">
        <h3 className="text-2xl md:text-4xl">Projects</h3>
        <div className="flex flex-row gap-4">
          <Filter label="All" category="all"/>
          <Filter label="Development" category="dev"/>
          <Filter label="Design" category="gd"/>
        </div>
        <MyProjects projects={filterProjects}/>
      </div>
      <Footer/>
    </div>
  )
}