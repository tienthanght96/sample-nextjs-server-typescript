import * as React from 'react'
import Layout from "@src/components/Layout";
import { LoginForm } from "@src/components/LoginForm";
import { authInitialProps } from '@src/utils/funcUtils';

export default class Login extends  React.Component<any, any> {
  static getInitialProps = authInitialProps();

  render(){
    return (
      <Layout title="Login" auth={this.props.auth}>
        <LoginForm />
      </Layout>
    );
  }
}