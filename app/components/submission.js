import Link from 'next/link'

export default function Submission({ submission }) {
  const metaData = [submission.humanDate]

  if (submission.location) {
    metaData.push(submission.location)
  }

  return (
    <div style={{maxWidth: '800px', width: '100%', borderBottom: '1px solid #ccc', paddingBottom: '1em'}}>
      <Link href='/'>
        <a style={{display: 'block', paddingBottom: '1em'}}>← Πίσω σε όλα τα περιστατικά</a>
      </Link>

      <video
        className="video-js"
        controls
        preload="none"
        width="640"
        height="264"
        poster={submission.thumbURL? submission.thumbURL: undefined}
        data-setup="{ preload: 'none' }"
        style={{width: '100%', height: '100%'}}
      >
        <source src={submission.url} type="video/mp4" />
        <p className="vjs-no-js">
          <a href={submission.url} target='_blank'>{ submission.description }</a>
        </p>
      </video>
      <span className='description' style={{fontSize: '140%'}}>
        { submission.description }
      </span>
      <span>
        { metaData.join(' • ') }
      </span>
    </div>
  )
}
