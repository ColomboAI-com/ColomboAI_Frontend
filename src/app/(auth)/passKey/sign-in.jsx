import { useState } from 'react';

const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handlePasskeySignIn = () => {
    setIsSignedIn(true);
  };

  const handleEmailOtp = () => {
    setIsSignedIn(true);
  };

  return (
    <>
      <div className="container">
        {/* Left side with the phone image */}
        <div className="left">
          <img
            src="/images/auth/auth-mobile-phone.svg"
            alt="Phone Preview"
            className="phone-image"
          />
        </div>

        {/* Right side with text and buttons */}
        <div className="right">
          <div className="content">
            <h2>
              Welcome! Sign in securely with a{' '}
              <span className="highlight">passkey</span>.
            </h2>
            <p className="description">
              No passwords, just you. Use a passkey for a fast, secure sign-in
              experience.
            </p>

            {/* Passkey button */}
            <button className="btn-primary" onClick={handlePasskeySignIn}>
              Continue with Passkey
            </button>

            {/* Email OTP link */}
            <button className="link" onClick={handleEmailOtp}>
              Use Email OTP instead
            </button>
          </div>
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        .container {
          display: flex;
          height: 100vh;
        }
        .left {
          flex: 1;
          background-color: #007bff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .right {
          flex: 1;
          background-color: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .phone-image {
          width: 80%;
          max-width: 400px;
        }
        .content {
          text-align: center;
          max-width: 400px;
          padding: 20px;
        }
        h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .highlight {
          color: #007bff;
        }
        .description {
          color: #555;
          margin-bottom: 30px;
        }
        .btn-primary {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-bottom: 15px;
        }
        .btn-primary:hover {
          background-color: #0056b3;
        }
        .link {
          background: none;
          color: #007bff;
          border: none;
          text-decoration: underline;
          cursor: pointer;
        }
        .link:hover {
          color: #0056b3;
        }
      `}</style>
    </>
  );
};

export default SignIn;
