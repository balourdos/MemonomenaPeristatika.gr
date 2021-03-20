import Link from 'next/link'

export default function Thumb({ video }) {
  return (
    <div className='thumb'>
      <Link href={`/v/${video.event_id}`}>
        <a>
          <span style={{display: 'block', width: '100%', height: 0, paddingTop: '56.25%', position: 'relative'}}>
            <span style={{display: 'block', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
              {video.thumbnail?
                <img id={video.event_id} style={{width: '100%', height: '100%'}} src={video.thumbnail} alt={video.description} />
                :
                <div id={video.event_id} style={{border: '1px solid #ccc', width: '100%', height: '100%', backgroundColor: 'black'}}></div>
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
