import Header from "./components/Header"
import Footer from "./components/Footer"
import ToTop from "./components/ToTop"

export default function About() {
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <ToTop/>
      <div className="min-w-full flex items-center" style={{minHeight: "60vh"}}>
        <div className="grid grid-cols-11 items-start min-w-full">
          <img src="/images/logo/logo-final.svg" className="col-start-2 col-span-3"/>
          <div className="flex flex-col items-start col-start-6 col-end-11 gap-2 md:gap-3">
            <h1 className="text-5xl md:text-8xl">About</h1>
            <p className="text-justify">Hi! I'm Nathan, a front-end developer, UI/UX designer, and graphic designer based in Vancouver. I pride myself on my abiliteis to learn fast and adapt quickly to our ever-changing landscape, while not forgetting where we come from.</p>
            <p>I really love to try different foods, experiences, and games. Shoot me a recommendation!</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}