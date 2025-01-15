import Header from "./components/Header"
import Footer from "./components/Footer"
import ToTop from "./components/ToTop"

export default function About() {
  return(
    <div className="container mx-auto flex p-4 pt-8 flex-col items-center gap-5 md:gap-8">
      <Header/>
      <h1>About</h1>
      <ToTop/>
      <Footer/>
    </div>
  )
}