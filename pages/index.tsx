import * as React from 'react'
import Link from 'next/link'
import Layout from '@src/components/Layout'
import { authInitialProps } from '@src/utils/funcUtils';

interface Props {
  auth: any;
}

export default class IndexPage extends React.Component<Props> {
  static getInitialProps = authInitialProps(false);

  render() {
    return (
      <Layout title="Home | Next.js + TypeScript Example" auth={this.props.auth}>
        <h1>Hello Next.js 👋</h1>
        <p><Link href='/profile'><a>Profile</a></Link></p>
      </Layout>
    )
  }
}