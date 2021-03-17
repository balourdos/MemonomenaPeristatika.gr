import { useEffect, useRef } from 'react'
import Link from 'next/link'
import videojs from 'video.js'

export default function Submission({ submission }) {
  const metaData = [submission.humanDate]
  const videoEl = useRef()

  if (submission.location) {
    metaData.push(submission.location)
  }

  useEffect(() => {
    const player = videojs(videoEl.current)

    player.ready(() => {
      try {
        player.play()
      }
      catch {
      }
    })
  }, [])

  return (
    <div style={{maxWidth: '800px', width: '100%', borderBottom: '1px solid #ccc', paddingBottom: '1em'}}>
      <Link href='/'>
        <a style={{display: 'block', paddingBottom: '1em'}}>← Πίσω σε όλα τα περιστατικά</a>
      </Link>

      <video
        className="video-js"
        ref={videoEl}
        controls
        preload="auto"
        width="640"
        height="264"
        poster={submission.thumbURL? submission.thumbURL: undefined}
        data-setup='{ "preload": "auto" }'
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
