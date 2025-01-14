export default function ToTop() {
  return(
    <button className="totop" onClick={() => window.scrollTo(0, 0)}>
      top
    </button>
  )
}