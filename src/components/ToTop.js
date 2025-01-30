import { useState } from "react";
import { Link, useLocation } from "react-router";

export default function ToTop() {
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      setVisible(true);
    }
    else setVisible(false);
  })
  
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  let atHome = false;
  if (pathname === "/") atHome = true;
  return(
    visible &&
    <div className="totop-container flex flex-row gap-2">
      <button className="totop text-l md:text-xl" onClick={() => window.scrollTo(0, 0)}>
        Scroll to top
      </button>
      {
        !atHome && 
        <Link className="totop text-l md:text-xl" to={"/"}>
          Home
        </Link>
      }
    </div>
  )
}