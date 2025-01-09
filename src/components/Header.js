import { Link } from "react-router";

export default function Header() {
  return(
    <div className="flex justify-between w-full items-center">
      <Link className="text-white font-semibold text-xl md:text-4xl min-w-12 md:min-w-16" to={"/"}>
        <img src="/images/logo-temp.svg"/>
      </Link>
    </div>
  )
}