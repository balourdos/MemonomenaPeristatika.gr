import { Submission } from './submission'

export default function Entry({ entry }) {
  return (
    <div>
      <h4>{ entry.title }</h4>

      <ul>
        {
          entry.videos.map(
            submission =>
              <li key={submission.url}>
                <Submission submission={submission} />
              </li>
          )
        }
      </ul>
    </div>
  )
}
