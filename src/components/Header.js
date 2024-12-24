import { Link } from "react-router";

export default function Header() {
  return(
    <div className="flex justify-between w-full">
      <Link className="text-white font-semibold text-xl md:text-4xl" to={"/"}>nathanyee</Link>
      <p>-</p>
    </div>
  )
}