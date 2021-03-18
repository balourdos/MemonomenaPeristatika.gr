import Head from 'next/head'
import _ from "lodash"
import Submission from "../../components/submission"
import Layout from '../../components/layout'

export default function Video({ submission }) {
  return <Layout>
    <Head>
      <title>{ submission.description } - Μεμονωμένο Περιστατικό</title>
      <meta property="og:locale" content="el_GR" />
      <meta property="og:title" content={ submission.description + " - Μεμονωμένο Περιστατικό" } />
      <meta property="og:description" content={ submission.description } />
      <meta property="og:image" content={ submission.thumbURL? submission.thumbURL: undefined } />
      <meta property="og:url" content={ "https://memonomenaperistatika.gr/v/" + submission.id } />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Μεμονωμένα Περιστατικά" />
      <meta name="twitter:title" content={ submission.description + " - Μεμονωμένο Περιστατικό" } />
      <meta name="twitter:description" content={ submission.description } />
      <meta name="twitter:image" content={ submission.thumbURL? submission.thumbURL: undefined } />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
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
