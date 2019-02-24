import * as React from 'react'
import Link from 'next/link'
import Layout from '@src/components/Layout'

const AboutPage: React.FunctionComponent = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>Profile</h1>
    <p>This is the Profile page</p>
    <p><Link href='/'><a>Go home</a></Link></p>
  </Layout>
)

export default AboutPage;
