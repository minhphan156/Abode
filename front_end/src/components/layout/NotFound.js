import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    let notFoundContent;

    notFoundContent = (
      <div class="row">
        <div class="col-md-8">
          <h1>Sorry, we couldn't find that page!</h1>
          <p class="lead">You tried "{this.props.match.params.attempt}"</p>
          <Link to="/">
            <button type="button" class="btn btn-danger">
              Back to Home Page
            </button>
          </Link>
        </div>
        <div class="col-md-4">
          <img
            src="https://avatars.mds.yandex.net/get-pdb/776003/f93ed707-280c-4f74-8b72-3d4e9da6495f/orig"
            alt=""
          />
        </div>
      </div>
    );

    return <div>{notFoundContent}</div>;
  }
}

export default NotFound;