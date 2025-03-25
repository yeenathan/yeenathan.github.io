import { useState } from "react";
import { Link } from "react-router";

export default function Gallery({images, setShowModal}) {
  const _images = images;
  const _max = images.length;
  const [position, setPosition] = useState(0);

  function handlePrev() {
    if (position === 0) {
      setPosition(_max-1);
      return;
    }
    setPosition(position-1);
  }

  function handleNext() {
    if (position === _max-1) {
      setPosition(0);
      return;
    }
    setPosition(position+1);
  }

  return(
    <div className="modal">
      <div className="modal-bg" onClick={() => setShowModal(false)}></div>
      <div className="modal-window max-w-6xl">
        <div className="p-8" style={{backgroundColor: "#547c99"}}>
          <img src={_images[position].path}/>
          {/* <Link to={_images[position].location}>go to</Link> */}
        </div>
        <div className="flex flex-row gap-2">
          <button onClick={() => handlePrev()}>prev</button>
          <button onClick={() => handleNext()}>next</button>
        </div>
      </div>
    </div>
  )
}