import { useEffect, useRef } from 'react'
import Link from 'next/link'
import videojs from 'video.js'

export default function Video({ video }) {
  const metaData = [video.humanDate]
  const videoEl = useRef()

  if (video.location) {
    metaData.push(video.location)
  }

  useEffect(() => {
    window.addEventListener("popstate",()=>{document.getElementById("go-back").click()})
    
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
    <div style={{maxWidth: '1200px', maxHeight: '100%', width: '100%', borderBottom: '1px solid #ccc', paddingBottom: '1em'}}>
      <Link href={`/#${video.event_id}`}>
        <a id ="go-back" style={{display: 'block', paddingBottom: '1em'}}>← Πίσω σε όλα τα περιστατικά</a>
      </Link>

      <div style={{width: '100%', height: '0', paddingTop: '56.25%', backgroundColor: 'red', position: 'relative'}}>
        <div style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
          <video
            className="video-js"
            ref={videoEl}
            controls
            preload="auto"
            poster={video.thumbnail? video.thumbnail: undefined}
            data-setup='{ "preload": "auto", "fill": true }'
          >
            <source src={video.url} type="video/mp4" />
            <p className="vjs-no-js">
              <a href={video.url} target='_blank'>{ video.description }</a>
            </p>
          </video>
        </div>
      </div>
      <span className='description' style={{fontSize: '140%'}}>
        { video.description }
      </span>
      <span>
        { metaData.join(' • ') }
      </span>
    </div>
  )
}
