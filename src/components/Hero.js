import { Link } from "react-router";

const RESUME_LINK = "https://www.dropbox.com/scl/fi/t48hatvpkncpldqrotkg0/resume2.pdf?rlkey=7ljnvzola3nqgguggjn72gl57&st=bbyxgc24&dl=1";

export default function Hero({scroll}) { 
  return(
    <div style={{height: "80vh"}} className="flex flex-col items-start min-w-full justify-center">
      <h1 className="text-4xl md:text-6xl">Nathan Yee</h1>
      <p className="text-xl md:text-2xl">Frontend Developer/Designer</p>
      <div className="flex flex-col mt-0.5 md:mt-1 md:flex-row md:justify-between md:gap-8">
        <a href={RESUME_LINK} download={"resume"}>Resume (PDF)</a>
        <Link to={"https://github.com/yeenathan/"} target="_blank">Github</Link>
        <Link to={"https://www.linkedin.com/in/yeenathan/"} target="_blank">LinkedIn</Link>
        <p>yeenathan21@gmail.com</p>
      </div>
      <p className="text-xl my-2 md:my-4">Mission statement, mission statement and mission statement.</p>
      <button className="hero-button" onClick={scroll}>View Projects</button>
    </div>
  )
}