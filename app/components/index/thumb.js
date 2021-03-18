import Link from 'next/link'

export default function Thumb({submission}) {
  return (
    <div className='thumb'>
      <Link href={`/v/${submission.id}`}>
        <a>
          <span style={{display: 'block', width: '100%', height: 0, paddingTop: '56.25%', position: 'relative'}}>
            <span style={{display: 'block', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
              {submission.thumbURL?
                <img style={{width: '100%', height: '100%'}} src={submission.thumbURL} alt={submission.description} />
                :
                <div style={{border: '1px solid #ccc', width: '100%', height: '100%', backgroundColor: 'black'}}></div>
              }
            </span>
          </span>
          <span className='description' style={{fontSize: '110%'}}>
            { submission.location? submission.location + ': ': '' }
            { submission.description }
          </span>
        </a>
      </Link>
    </div>
  )
}
