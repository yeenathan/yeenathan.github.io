import { Link } from "react-router"

export default function Footer() {
  return(
    <footer className="flex items-center flex-col md:items-start text-sm min-w-full mt-8">
      <Link to={"https://github.com/yeenathan/"} target="_blank">Github</Link>
      <Link to={"https://www.linkedin.com/in/yeenathan/"} target="_blank">LinkedIn</Link>
      <p>yeenathan21@gmail.com</p>
    </footer>
  )
}