import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";
import "../styles/App.css";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    let view = {
      paddingRight: "10px"
    };
    let sub = {
      paddingLeft: "7px",
      paddingRight: "10px"
    };
    let log = {
      paddingLeft: "10px"
    };
    return (
      <div className="header">
        <div className="title">
          <h1>Tech Links Braindump</h1>
        </div>
        <div className="allOptions">
          <div className="linkOptions">
            <Link to="/" className="no-underline options">
              <p style={view}>View List</p>
            </Link>

            {authToken && (
              <div className="submitLink">
                <div className="">
                  <p>|</p>
                </div>
                <Link to="/create" className="no-underline options">
                  <p style={sub}>Submit a Link</p>
                </Link>
              </div>
            )}
            <p>|</p>
          </div>
          <div className="log">
            {authToken ? (
              <div
                className="pointer black"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  this.props.history.push(`/`);
                }}
              >
                <p style={log}>Logout</p>
              </div>
            ) : (
              <Link to="/login" className="no-underline black">
                <p style={log}>Login</p>
              </Link>
            )}
          </div>
        </div>
        <h4>
          A collection of interesting tech links, tutorials etc. Sign up and Log
          in to post and up-vote ▲
        </h4>
      </div>
    );
  }
}

export default withRouter(Header);
