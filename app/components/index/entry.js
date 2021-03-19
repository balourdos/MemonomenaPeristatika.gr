import Thumb from './thumb'

export default function Entry({ entry }) {
  return (
    <div>
      <h4>{ entry.title }</h4>

      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          entry.videos.map(
            video =>
              <Thumb video={video} />
          )
        }
      </div>
    </div>
  )
}
