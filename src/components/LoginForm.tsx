import * as React from "react";
import Router from "next/router";
import { loginUser } from "@src/utils/funcUtils";

interface LoginFormState {
  email: string;
  password: string;
  error: string | any;
  isLoading: boolean;
}

export class LoginForm extends React.Component<{}, LoginFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: "Rey.Padberg@karina.biz",
      password: "ambrose.net",
      error: "",
      isLoading: false
    };
  }

  handleChange = (event: any) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value } as Pick<LoginFormState, any>);
  };

  handleSubmit = (event: any) => {
    const { email, password } = this.state;

    event.preventDefault();
    this.setState({ error: "", isLoading: true });
    loginUser(email, password)
      .then(() => {
        Router.push("/profile");
      })
      .catch(this.showError);
  };

  showError = (err: any) => {
    console.error(err);
    const error = (err.response && err.response.data) || err.message;
    this.setState({ error, isLoading: false });
  };

  render() {
    const { email, password, error, isLoading } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <br />
        <div>
          <input
            className="uk-input"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <div>
          <input
            className="uk-input"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <button
          className="uk-button uk-button-default"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Sending" : "Submit"}
        </button>
        <br />
        {error && <div>{error}</div>}
      </form>
    );
  }
}
