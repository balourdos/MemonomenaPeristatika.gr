export function Submission({ submission }) {
  console.log(submission)

  return (
    <div>
      <span className='description'>
        { submission.description }
      </span>
      <video
        className="video-js"
        controls
        preload="none"
        width="640"
        height="264"
        poster={submission.thumbURL}
        data-setup="{ preload: 'none' }"
      >
        <source src={submission.url} type="video/mp4" />
        <p className="vjs-no-js">
          <a href={submission.url} target='_blank'>{ submission.description }</a>
        </p>
      </video>
    </div>
  )
}
