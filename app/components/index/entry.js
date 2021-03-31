import Thumb from './thumb' 

export default function Entry({ entry }) {

  return (
    <div className='entry'>
      <h4 id={entry.title.replace(/ /g, '_')}>{ entry.title }</h4>

      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
        {
          entry.videos.map(
            (video, i) =>
              <Thumb  key={i} video={video}/>
          )
        }
      </div>
    </div>
  )
}
