import React from "react";

export default function GoogleAuth() {
  const handleGoogleLogin = () => {
    // const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const clientId =
      "699400475494-hd4r32rnd7db5qmk2kr1nh30qmh93c3q.apps.googleusercontent.com";
    const redirectUri =
      "https://o-auth-callback-sla.vercel.app/api/callbackGoogle"; // Ensure this matches the one set in Google Cloud Console
    const scope =
      "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.channel-memberships.creator https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const responseType = "code";

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = url;
  };

  return (
    <div>
      <h1>OAuth</h1>
      <h2>Since, this app uses google's OAuth protocol in test mode, only registered email IDs can be authenticated.</h2>
      <h3>Non-registered users can use following credentials for trial</h3>
      <h3>email: testg2657@gmail.com</h3>
      <h3>password: google.test@111</h3>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}
