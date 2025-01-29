import { Link } from "react-router";

export default function ProjectDetails({links, tools}) {
  return(
    <div className="flex flex-col gap-2 md:gap-3 min-w-full">
      <h2 className="subhead header-blue font-normal text-xl md:text-2xl">Overview</h2>
      { links && 
        <div className="flex flex-col md:flex-row md:gap-4">
        {
          links.map((link, key) => {
            return <Link to={link.url} target="_blank" key={key}>{link.label}</Link>
          })
        }
      </div>
      }
      <p className="font-bold">Tools used</p>
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