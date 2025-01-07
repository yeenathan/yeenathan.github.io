import { Link } from "react-router"

const RESUME_LINK = "https://www.dropbox.com/scl/fi/t48hatvpkncpldqrotkg0/resume2.pdf?rlkey=7ljnvzola3nqgguggjn72gl57&st=bbyxgc24&dl=1";

export default function Footer() {
  return(
    <footer className="flex items-end flex-col text-sm min-w-full mt-8">
      <a href={RESUME_LINK} download={"resume"}>Resume (PDF)</a>
      <Link to={"https://github.com/yeenathan/"} target="_blank">Github</Link>
      <Link to={"https://www.linkedin.com/in/yeenathan/"} target="_blank">LinkedIn</Link>
      <p>yeenathan21@gmail.com</p>
    </footer>
  )
}