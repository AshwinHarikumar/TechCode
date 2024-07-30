import React from 'react';
import { auth, googleAuthProvider } from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

function SignUp() {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, password } = state;
    alert(`You are signing up with name: ${name}, email: ${email}, and password: ${password}`);
    setState({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log('Google Sign-Up successful:', result.user);
    } catch (error) {
      console.error('Google Sign-Up error:', error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <br />
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <br/>
        <div className="button-container">
        <button
            type="button"
            className="google-sign-in-button"
            onClick={handleGoogleSignUp}
          >
            <span className="google-icon"></span>
          </button>
          <button type="submit">Sign Up</button>
          
        </div>
      </form>
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
          background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png');
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
}

export default SignUp;
