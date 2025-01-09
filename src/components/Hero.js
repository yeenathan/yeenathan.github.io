import { Link } from "react-router";

function Icon({url, src, hover}) {
  return(
    <Link className="min-w-16" to={url} target="_blank">
      <img 
        src={src}
        onMouseOver={(e) => e.currentTarget.src=hover}
        onMouseOut={(e) => e.currentTarget.src=src}
      />
    </Link>
  )
}

function Info() {
  return(
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
      <Icon url="https://github.com/yeenathan/" src="/images/icons/gh-black.svg" hover="/images/icons/gh-brightblue.svg"/>
      <Icon url="https://linkedin.com/in/yeenathan/" src="/images/icons/linkedin-black.svg" hover="/images/icons/linkedin-brightblue.svg"/>
    </div>
  )
}

export default function Hero({scroll}) { 
  return(
    <div style={{minHeight: "75vh"}} className="flex flex-col items-center md:items-start min-w-full justify-center gap-2 md:gap-4">
      <div>
        <h1 className="text-5xl md:text-6xl">Nathan Yee</h1>
        <p className="text-2xl md:text-2xl">Frontend Developer & Designer</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl text-center md:text-left">Vancouver based frontend developer & visual designer dedicated to providing sophisticated and empathetic solutions.</p>
        <Info/>
      </div>
      <button className="mt-2 hero-button" onClick={scroll}>View Projects</button>
    </div>
  )
}