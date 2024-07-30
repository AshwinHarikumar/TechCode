import React from 'react';
import { auth, googleAuthProvider } from './firebaseConfig';
import { signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';

function SignIn() {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    resetEmail: ''
  });

  const [isResetFormVisible, setResetFormVisible] = React.useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = state;
    alert(`You are logged in with email: ${email} and password: ${password}`);
    setState({
      email: '',
      password: '',
      resetEmail: ''
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log('Google Sign-In successful:', result.user);
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, state.resetEmail);
      alert('Password reset email sent!');
      setState({ ...state, resetEmail: '' });
      setResetFormVisible(false);
    } catch (error) {
      console.error('Password reset error:', error);
      alert('Error sending password reset email.');
    }
  };

  return (
    <div className="form-container sign-in-container">
      {isResetFormVisible ? (
        <div className="reset-password-form">
          <br/>
          <br/>
        
          <h1>Reset Password</h1>
          <br/>
          <br/>
          <br/>
          <br/>
          <input
            type="email"
            placeholder="Enter your email"
            name="resetEmail"
            value={state.resetEmail}
            onChange={handleChange}
          />
          <br/>
          <br/>
          <button onClick={handlePasswordReset}>Send Reset Email</button>
          <br/>
          <br/>
          <button onClick={() => setResetFormVisible(false)}>Back to Sign In</button>
        </div>
      ) : (
        <form onSubmit={handleOnSubmit}>
          <h1>Sign in</h1>
          <span>or use your account</span>
          <br />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
          <a href="#" onClick={() => setResetFormVisible(true)}>Forgot your password?</a>
          <div className="button-container">
            <button
              type="button"
              className="google-sign-in-button"
              onClick={handleGoogleSignIn}
            >
              <span className="google-icon"></span>
            </button>
            <button type="submit">Sign In</button>
          </div>
        </form>
      )}
      <style jsx>{`
        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }

        .button-container {
          display: flex;
          flex-direction: row;
          gap: 10px;
        }

        button {
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s, color 0.3s;
        }

        .google-sign-in-button {
          background-color: transparent;
          color: #333;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .google-sign-in-button:hover {
          background-color: transparent;
        }

        .google-icon {
          width: 34px;
          height: 34px;
          background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png');
          background-size: cover;
          background-repeat: no-repeat;
        }

        .reset-password-form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .reset-password-form input {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

export default SignIn;
