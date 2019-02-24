import * as React from 'react'
import { NextContext } from 'next'
import Link from 'next/link'
import Layout from '@src/components/Layout'

interface ProfileProps {
  userProfile:  any;
};

export default class Profile extends React.Component<ProfileProps> {
  static async getInitialProps(ctx: NextContext) {
    console.log(ctx);
    return {};
  }

  render() {
    return (
      <Layout title="About | Next.js + TypeScript Example">
        <h1>Profile</h1>
        <p>This is the Profile page</p>
        <p><Link href='/'><a>Go home</a></Link></p>
      </Layout>
    )
  }
}