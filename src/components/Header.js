import { Link } from "react-router";
import { useState } from "react";
import Gallery from "./Gallery";
import { getRouteImages } from "../utils/getRouteImages";

export default function Header() {
  const [showGallery, setShowGallery] = useState(false);

  return(
    <div className="flex flex-row justify-between w-full items-center mb-4 md:mb-16">
      { showGallery &&
        <Gallery images={getRouteImages()} setShowModal={setShowGallery}></Gallery>
      }
      <Link className="min-w-12 md:min-w-16" to={"/"}>
        <img
          src="/images/logo/logo-final-bright.svg"
          onMouseOver={(e) => e.currentTarget.src="/images/logo/logo-final-hover.svg"}
          onMouseOut={(e) => e.currentTarget.src="/images/logo/logo-final-bright.svg"}
        />
      </Link>
      <div className="flex flex-row gap-4 md:gap-8">
        <button onClick={() => setShowGallery(true)} className="text-xl md:text-2xl font-bold">
          Gallery
        </button>
        <Link to="/about" className="text-xl md:text-2xl font-bold">About</Link>
      </div>
    </div>
  )
}