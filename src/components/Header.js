import { Link } from "react-router";

export default function Header() {
  return(
    <div className="flex flex-row justify-between w-full items-center mb-4 md:mb-16">
      <Link className="min-w-12 md:min-w-16" to={"/"}>
        <img
          src="/images/logo/logo-final-bright.svg"
          onMouseOver={(e) => e.currentTarget.src="/images/logo/logo-final-hover.svg"}
          onMouseOut={(e) => e.currentTarget.src="/images/logo/logo-final-bright.svg"}
        />
      </Link>
      <Link to="/about" className="text-xl md:text-2xl font-bold">About</Link>
    </div>
  )
}