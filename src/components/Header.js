import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="title">Tech Links Braindump</div>

          <Link to="/" className="no-underline options">
            View List
          </Link>
          {authToken && (
            <div className="flex">
              <div className="ml1">|</div>
              <Link to="/create" className="no-underline options">
                Submit
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-fixed">
          {authToken ? (
            <div
              className="ml1 pointer black"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push(`/`);
              }}
            >
              Logout
            </div>
          ) : (
            <Link to="/login" className="ml1 no-underline black">
              Login
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
