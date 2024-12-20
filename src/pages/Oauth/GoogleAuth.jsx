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
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-3/4 md:w-1/2 lg:w-1/3">
        <h1 className="text-4xl font-extrabold text-green-700 text-center mb-4">
          OAuth Login
        </h1>
        <p className="text-gray-800 text-center mb-6">
          This app uses Google OAuth in test mode, so only registered email IDs
          can be authenticated.
        </p>
        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h3 className="text-gray-700 font-medium mb-2 text-center">
            Non-registered users can use the following credentials for trial:
          </h3>
          <p className="text-gray-600 text-center">
            <span className="font-semibold">Email:</span> testg2657@gmail.com
          </p>
          <p className="text-gray-600 text-center">
            <span className="font-semibold">Password:</span> google.test@111
          </p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
