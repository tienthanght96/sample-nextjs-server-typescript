import * as React from 'react'
import Layout from "@src/components/Layout";
import { LoginForm } from "@src/components/LoginForm";

export default class Login extends  React.Component<any, any> {
  static getInitialProps = async () => {
    return {}
  }

  render(){
    return (
      <Layout title="Login">
        <LoginForm />
      </Layout>
    );
  }
}