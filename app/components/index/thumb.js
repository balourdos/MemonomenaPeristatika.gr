export default function Thumb({submission}) {
  return (
    <div>
      <video
        className="video-js"
        controls
        preload="none"
        width="640"
        height="264"
        poster={submission.thumbURL? submission.thumbURL: undefined}
        data-setup="{ preload: 'none' }"
      >
        <source src={submission.url} type="video/mp4" />
        <p className="vjs-no-js">
          <a href={submission.url} target='_blank'>{ submission.description }</a>
        </p>
      </video>
      <span className='description'>
        { submission.location? submission.location + ': ': '' }
        { submission.description }
      </span>
    </div>
  )
}
