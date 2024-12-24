import Footer from "./components/Footer";
import Header from "./components/Header";

const projects = [
  {
    name: "Remedify",
    image: "/images/remedify.jpg"
  },
  // {
  //   name: "Graphic Design",
  //   image: "/images/remedify.jpg"
  // },
  // {
  //   name: "Studius",
  //   image: "/images/remedify.jpg"
  // }
]

export default projects;

export function Remedify() {
  return(
    <div className="bg-neutral-900 text-zinc-100 min-h-screen">
      <div className="container mx-auto flex p-4 flex-col items-center gap-5">
        <Header/>
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl md:text-6xl">Remedify</h1>
          <img src="/images/remedify.jpg"/>
          <p className="">Remedify is</p>
        </div>
        <Footer/>
      </div>
    </div>
  )
}