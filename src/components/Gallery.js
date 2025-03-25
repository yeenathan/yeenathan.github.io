import { useState } from "react";
import { Link } from "react-router";

export default function Gallery({images, setShowModal}) {
  const _images = images;
  // const _max = images.length;
  const [position, setPosition] = useState(0);

  // function handlePrev() {
  //   if (position === 0) {
  //     setPosition(_max-1);
  //     return;
  //   }
  //   setPosition(position-1);
  // }

  // function handleNext() {
  //   if (position === _max-1) {
  //     setPosition(0);
  //     return;
  //   }
  //   setPosition(position+1);
  // }

  return(
    <div className="modal">
      <div className="modal-bg" onClick={() => setShowModal(false)}></div>
      <div className="modal-window">
        <div className="flex p-8 justify-center" style={{backgroundColor: "#171717", borderRadius: "1rem"}}>
          <Link to={_images[position].location}>
            <img src={_images[position].path} style={{maxHeight: "55vh"}}/>
          </Link>
        </div>
        <div className="flex flex-row gap-2 mt-3 overflow-x-scroll">
          {
            _images.map((image, key) => {
              return(
                <img src={image.path} className="max-h-16" key={key} onClick={() => setPosition(key)}
                  style={{border: position === key ? "2px solid #48cbff" : null, cursor: "pointer"}}
                ></img>
              )
            })
          }
        </div>
        {/* <div className="flex flex-row gap-2">
          <button onClick={() => handlePrev()}>prev</button>
          <button onClick={() => handleNext()}>next</button>
        </div> */}
      </div>
    </div>
  )
}