import { useState } from "react";

const RESUME_LINK = "https://www.dropbox.com/scl/fi/cscyh9b0oks3re65331oq/resume04.pdf?dl=1";

function Icon({url, src, hover, size=null}) {
  return(
    <a href={url} target="_blank">
      <img 
        className={size}
        src={src}
        onMouseOver={(e) => e.currentTarget.src=hover}
        onMouseOut={(e) => e.currentTarget.src=src}
      />
    </a>
  )
}

export function Info({small=false}) {
  const [copied, setCopied] = useState(false);
  const size = "w-12";

  function handleEmail(e) {
    if (!copied) navigator.clipboard.writeText("yeenathan21@gmail.com");
    setCopied(!copied);
  }

  return(
    <div className="flex flex-col items-center md:flex-row gap-2 md:gap-4">
      <div className="flex flex-row gap-2">
        <a href={RESUME_LINK} download={"resume"}>
          <img 
            className={size}
            src={"/images/icons/resume-black.svg"}
            onMouseOver={(e) => e.currentTarget.src="/images/icons/resume-brightblue.svg"}
            onMouseOut={(e) => e.currentTarget.src="/images/icons/resume-black.svg"}
          />
        </a>
        <Icon url="https://github.com/yeenathan/" src="/images/icons/gh-black.svg" hover="/images/icons/gh-brightblue.svg" size={size}/>
        <Icon url="https://linkedin.com/in/yeenathan/" src="/images/icons/linkedin-black.svg" hover="/images/icons/linkedin-brightblue.svg" size={size}/>
        <button>
          <img
            className={size}
            src="/images/icons/mail-black.svg"
            onMouseOver={e => e.currentTarget.src="/images/icons/mail-brightblue.svg"}
            onMouseOut={e => {
              if (!copied)
              e.currentTarget.src="/images/icons/mail-black.svg"
            }}
            onClick={handleEmail}
          />
        </button>
      </div>
      {
        copied &&
        <div className="flex flex-col items-center md:items-start">
          <p style={{color: "#48cbff"}}>yeenathan21@gmail.com</p>
          <p>Automatically copied to clipboard.</p>
        </div>
      }
    </div>

  )
}

export default function Hero({projectRef}) { 
  function handleClick() {
    projectRef.current.scrollIntoView();
  }
  return(
    <div style={{minHeight: "70vh"}} className="flex flex-col items-center md:items-start min-w-full justify-center gap-2 md:gap-4">
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-5xl md:text-8xl">Nathan Yee</h1>
        <h2 className="text-center md:text-left text-xl md:text-2xl subhead">Frontend Developer & Designer</h2>
      </div>
      <div className="flex flex-col items-center md:items-start gap-4">
        <p className="text-l md:text-xl text-center md:text-left">Vancouver based frontend developer & visual designer dedicated to providing sophisticated and empathetic solutions.</p>
        <Info/>
      </div>
      <button className="mt-2 hero-button text-xl px-6 py-4" onClick={handleClick}>View Projects</button>
    </div>
  )
}