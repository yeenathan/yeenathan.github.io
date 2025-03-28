import { CodeBlock, dracula } from "react-code-blocks";
import { useState } from "react";

export default function Code({title, text, link=null}) {
  const [visible, setVisible] = useState(false);
  return(
    <div>
      <button className="min-w-full text-xl" onClick={() => setVisible(!visible)}>
        <div className="snippet flex flex-row justify-between items-center py-2 px-4 mb-2">
          {title}
          <p>V</p>
        </div>
      </button>
      {
        visible &&
        <div style={{fontSize: "1rem"}}>
          {link && <a href={link} target="_blank">Link to file</a>}
          <CodeBlock text={text} theme={dracula} language="javascript"/>
        </div>
      }
    </div>
  )
}