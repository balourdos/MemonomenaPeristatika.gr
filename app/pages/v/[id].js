import _ from "lodash"
import { Submission } from "../../components/submission"
import Layout from '../../components/layout'

export default function Video({ submission }) {
  return <Layout>
    <Submission submission={submission} />
  </Layout>
}

export async function getStaticPaths() {
  const { getContributions } = require('../../lib/entries')

  const contributions = getContributions()
  const paths = contributions.map(({id}) => ({ params: { id: id.toString() } }))

  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { getContributions } = require('../../lib/entries')

  const contributions = getContributions()
  const submission = _.find(contributions, ['id', params.id])

  return {
    props: { submission }
  }
}
