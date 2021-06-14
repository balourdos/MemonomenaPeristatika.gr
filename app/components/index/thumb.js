import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Thumb({ video }) {
  useEffect(() => {
   document.getElementById(`${video.event_id}`).addEventListener('click',()=>{ 
     console.log(location.hash= `${video.event_id}` )
   })

  }, [])
  return (
    <div id={video.event_id} className='thumb'>
      <Link href={`/v/${video.event_id}`}>
        <a>
          <span style={{display: 'block', width: '100%', height: 0, paddingTop: '56.25%', position: 'relative'}}>
            <span style={{display: 'block', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'black'}}>
              {video.thumbnail?
                <img style={{margin: 'auto', height: '100%', display: 'block'}} src={video.thumbnail} alt={video.description} />
                :
                <div style={{border: '1px solid #ccc', width: '100%', height: '100%', backgroundColor: 'black'}}></div>
              }
            </span>
          </span>
          <span className='description' style={{fontSize: '110%'}}>
            { video.location? video.location + ': ': '' }
            { video.description }
          </span>
        </a>
      </Link>
    </div>
  )
}
