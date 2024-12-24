import { Link } from "react-router"

export default function Footer() {
  return(
    <footer className="flex items-center flex-col md:items-start text-sm min-w-full">
      <Link to={"https://github.com/yeenathan/"} target="_blank">Github</Link>
      <p>236 688 9827</p>
      <p>yeenathan21@gmail.com</p>
    </footer>
  )
}