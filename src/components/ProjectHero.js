export default function ProjectHero({coverPath, content, title}) {
  console.log(coverPath);
  return(
    <div className="min-w-full">
      <h1 className="text-3xl md:text-6xl mb-4 md:mb-12">{title}</h1>
      <div className="min-w-full flex flex-col items-start gap-2 md:gap-4">
        <img src={coverPath}/>
        {content}
      </div>
    </div>
  )
}
