export default function ProjectDetails({links=null, tools, takeaways=null, remedify=false, studius=false}) {
  return(
    <div className="flex flex-col gap-2 md:gap-3 min-w-full">
      <h2 className="subhead header-blue font-normal text-xl md:text-2xl">Overview</h2>
      { links && 
        <div className="flex flex-col md:flex-row md:gap-4">
        {
          links.map((link, key) => {
            return <a href={link.url} target="_blank" key={key}>{link.label}</a>
          })
        }
      </div>
      }
      {/* {
        takeaways &&
        <div className="flex flex-col md:gap-4">
          <p className="font-bold">Takeaways</p>
          <ul className="pl-8 list-disc grid grid-cols-1 md:grid-cols-2">
          {
            takeaways.map((takeaway, key) => {
              return <li key={key}>{takeaway}</li>
            })
          }
          </ul>
        </div>
      } */}
      {
        remedify && 
        <table>
          <tr>
            <td className="md:max-w-8"><strong>Role:</strong></td>
            <td><strong className="text-bold">Lead developer</strong>, research & validation</td>
          </tr>
          <tr>
            <td className="md:max-w-8"><strong>Timeline:</strong></td>
            <td>3 months</td>
          </tr>
        </table>
      }
      {
        studius && 
        <table>
          <tr>
            <td className="md:max-w-8"><strong>Role:</strong></td>
            <td><strong className="text-bold">Lead developer</strong>, UX/UI designer, Branding designer</td>
          </tr>
          <tr>
            <td className="md:max-w-8"><strong>Timeline:</strong></td>
            <td>3 months</td>
          </tr>
        </table>
      }
      <p className="font-bold">Tools</p>
      <ul className="pl-8 list-disc grid grid-cols-2">
        {
          tools.map((tool, key) => {
            return <li key={key}>{tool}</li>
          })
        }
      </ul>
    </div>
  )
}