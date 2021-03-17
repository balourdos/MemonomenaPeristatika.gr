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
      console.log('Player is ready')
      try {
        player.play()
        console.log('Play issued')
      }
      catch {
        console.log('Unmuted autoplay not allowed')
        player.muted(true)
        try {
          player.play()
        }
        catch {
          console.log('Muted autoplay not allowed')
          player.muted(false)
        }
      }
      console.log('Ready done')
    })
  }, [])

  return (
    <div style={{maxWidth: '1200px', width: '100%', borderBottom: '1px solid #ccc', paddingBottom: '1em'}}>
      <Link href='/'>
        <a style={{display: 'block', paddingBottom: '1em'}}>← Πίσω σε όλα τα περιστατικά</a>
      </Link>

      <video
        className="video-js"
        ref={videoEl}
        controls
        preload="auto"
        width="100%"
        height="100%"
        poster={submission.thumbURL? submission.thumbURL: undefined}
        data-setup='{ "preload": "auto", "fluid": true }'
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
