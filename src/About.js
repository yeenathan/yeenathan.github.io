import Header from "./components/Header"
import Footer from "./components/Footer"
import ToTop from "./components/ToTop"
import { Info } from "./components/Hero"

export default function About() {
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:px-16 xl:px-32 min-w-full" style={{minHeight: "60vh"}}>
        <img src="/images/me.jpg" className="max-w-full md:max-w-96"/>
        <div className="flex flex-col items-start gap-2 md:gap-3">
          <h1 className="text-5xl md:text-8xl">About</h1>
          <p className="text-justify">Hi! I'm Nathan, a front-end developer, UI/UX designer, and graphic designer based in Vancouver. I pride myself on my abilities to learn fast and adapt quickly to our ever-changing landscape, while not forgetting where we come from (not a vibe coder).</p>
          <p>I really love to try different foods, experiences, and games. Shoot me a recommendation!</p>
          <Info/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}