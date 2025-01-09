import { Link } from "react-router"
import { Info } from "./Hero";

const RESUME_LINK = "https://www.dropbox.com/scl/fi/t48hatvpkncpldqrotkg0/resume2.pdf?rlkey=7ljnvzola3nqgguggjn72gl57&st=bbyxgc24&dl=1";

export default function Footer() {
  return(
    <footer className="flex justify-center md:justify-start min-w-full py-8">
      <Info small={true}/>
    </footer>
  )
}