import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { logoutUser } from '@src/utils/funcUtils';

type Props = {
  title?: string,
  auth?: any;
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children, auth, title = 'This is the default title' }) => {
  const { user = {} } = auth || {};
  return (
    <div className="root">
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/css/uikit.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit-icons.min.js"></script>
      </Head>
      <header>
        <nav>
          <span>
            Welcome, <strong>{`${user.name || "Guest"} `}</strong>
          </span>
          { user.email
            ? (
                <React.Fragment>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                  <button onClick={logoutUser}>Logout</button>
                </React.Fragment>
              )
            : (
              // UnAuth Navigation
                <Link href="/login">
                  <a>Login</a>
                </Link>
              )
          }
          <Link href='/'><a>Home</a></Link> | {' '}
          <Link href='/list-class'><a>List Example</a></Link> | {' '}
          <Link href='/list-fc'><a>List Example (as Functional Component)</a></Link> | {' '}
          <Link href='/about'><a>About</a></Link> | {' '}
        </nav>
      </header>
      {children}
      <style>
      {`
        .root {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .navbar {
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        a {
          margin-right: 0.5em;
        }
        button {
          text-decoration: underline;
          padding: 0;
          font: inherit;
          cursor: pointer;
          border-style: none;
          color: rgb(0, 0, 238);
        }
      `}
      </style>
    </div>
  )
}

export default Layout
