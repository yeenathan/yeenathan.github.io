import { Link } from "react-router";

export default function Header() {
  return(
    <div className="flex justify-start w-full items-center">
      <Link className="min-w-12 md:min-w-16 mb-4 md:mb-16" to={"/"}>
        <img src="/images/logo/logo-v1f-v3.svg"/>
      </Link>
    </div>
  )
}