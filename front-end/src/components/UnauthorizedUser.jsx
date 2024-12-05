import React from "react";

export default function UnauthorizedUser() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className="display-1">Unauthorized Access</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    </div>
  );
}
