export default function MyImage({src, className, setShowGallery}) {
  return(
    <img className={className} src={src} onClick={() => setShowGallery(true)} style={{cursor: "pointer"}}></img>
  )
}