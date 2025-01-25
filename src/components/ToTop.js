import { useState } from "react";

export default function ToTop() {
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      setVisible(true);
    }
    else setVisible(false);
  })
    const [visible, setVisible] = useState(false);
  
  return(
    visible &&
    <button className="totop text-xl" onClick={() => window.scrollTo(0, 0)}>
      Scroll to top
    </button>
  )
}