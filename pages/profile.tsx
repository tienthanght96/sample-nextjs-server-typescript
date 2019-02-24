import * as React from 'react'
import Layout from '@src/components/Layout'
import { appAxios } from '@src/config/axios';
import { IUserInfo } from '@src/interfaces';
import { authInitialProps } from '@src/utils/funcUtils';

interface ProfileState {
  userProfile:  IUserInfo;
  isErrored: boolean;
  isRequesting: boolean;
};

interface ProfileProps {
  auth: any;
}

export default class Profile extends React.Component<ProfileProps, ProfileState> {
  static getInitialProps = authInitialProps(true);

  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      userProfile: {
        id: -1,
        name: '',
        email: '',
        username: ''
      },
      isRequesting: true,
      isErrored: false,
    }
  }

  async componentDidMount() {
    try {
      const { data } = await appAxios.get('/api/profile');
      this.setState({ userProfile: data.user, isRequesting: false });
    } catch (error) {
      this.setState({ isErrored: true, isRequesting: false });
    }
  }

  render() {
    const { isErrored, isRequesting, userProfile } = this.state;

    return (
      <Layout title="About | Next.js + TypeScript Example" auth={this.props.auth}>
        <br />
        { (isErrored)
          ? <div className="uk-alert uk-alert-danger uk-card-body uk-width-1-2@m">Can't not get user info !</div>
          : (isRequesting)
          ?  
            (
              <div className="uk-alert uk-card-default uk-card-body uk-width-1-2@m">
                <h3>Loading....</h3>
              </div>
            )
          : (
              <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m">
                <h3 className="uk-card-title">{userProfile.username}</h3>
                <p>{userProfile.email} - <a href="#">{userProfile.website}</a> {userProfile.phone}</p>
              </div>
            )
        }
      </Layout>
    )
  }
}