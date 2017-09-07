export class AuthTestHelper {

  getTestProfile() {
    return {
      "email"              : "glitchbane@gmail.com",
      "name"               : "glitchbane@gmail.com",
      "picture"            : "https://s.gravatar.com/avatar/866b88579d1c5329719fe007739db6a1?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fgl.png",
      "nickname"           : "glitchbane",
      "last_password_reset": "2016-12-05T18:56:28.275Z",
      "app_metadata"       : {
        "signed_up"  : true,
        "first_login": false
      },
      "signed_up"          : true,
      "email_verified"     : true,
      "clientID"           : "5kD8y56DeINoArawrNQY7mFWETh1mlBY",
      "updated_at"         : "2017-01-16T16:48:45.605Z",
      "user_id"            : "auth0|583f41085e5686fa0d44c450",
      "identities"         : [
        {
          "user_id"   : "583f41085e5686fa0d44c450",
          "provider"  : "auth0",
          "connection": "Username-Password-Authentication",
          "isSocial"  : false
        }
      ], "created_at"      : "2016-11-30T21:13:44.694Z",
      "global_client_id"   : "ccZ4QTu3bpgdio1anqFli35xkNOFceZ2",
      "user_metadata"      : {}
    };
  }

  getTestToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
  }

}
