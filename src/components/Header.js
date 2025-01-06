import { Link } from "react-router";

const RESUME_LINK = "https://www.dropbox.com/scl/fi/t48hatvpkncpldqrotkg0/resume2.pdf?rlkey=7ljnvzola3nqgguggjn72gl57&st=bbyxgc24&dl=1";

export default function Header() {
  return(
    <div className="flex justify-between w-full items-center">
      <Link className="text-white font-semibold text-xl md:text-4xl" to={"/"}>nathanyee</Link>
      <a className="font-semibold text-xl" href={RESUME_LINK} download={"resume"}>Resume</a>
    </div>
  )
}