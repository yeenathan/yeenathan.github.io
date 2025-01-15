import { Info } from "./Hero";

export default function Footer() {
  return(
    <footer className="flex justify-center md:justify-start min-w-full py-8">
      <Info small={true}/>
    </footer>
  )
}