import React, { useState } from 'react';
import axios from 'axios';
import { auth } from './firebaseConfig'; // Ensure firebaseConfig is correctly set up
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SigninForm.css';

const googleAuthProvider = new GoogleAuthProvider();

const SignIn = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    resetEmail: ''
  });
  const [isResetFormVisible, setResetFormVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await axios.post('http://localhost:3000/login/google', { token: idToken });
      const { token, isAdmin } = response.data;

      localStorage.setItem('token', token);

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/homeuser');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('Error during Google Sign-In. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password } = state;
    setLoading(true);
    setError('');

    try {
      const url = isSignUp ? 'http://localhost:3000/signup' : 'http://localhost:3000/login';
      const response = await axios.post(url, { name, email, password });
      const { token, isAdmin } = response.data;

      localStorage.setItem('token', token);

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/homeuser');
      }
      setState({ name: '', email: '', password: '', resetEmail: '' });
    } catch (error) {
      console.error(`${isSignUp ? 'Sign-Up' : 'Sign-In'} error:`, error);
      setError(`Error ${isSignUp ? 'signing up' : 'signing in'}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:3000/resetPassword', { email: state.resetEmail });
      alert('Password reset email sent!');
      setState({ ...state, resetEmail: '' });
      setResetFormVisible(false);
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Error sending password reset email. Please check the email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {isResetFormVisible ? (
        <div className="form reset-form">
          <h1>Reset Password</h1>
          <input
            type="email"
            placeholder="Enter your email"
            name="resetEmail"
            value={state.resetEmail}
            onChange={handleChange}
            className="input"
          />
          <button onClick={handlePasswordReset} disabled={loading} className="button">
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
          <button onClick={() => setResetFormVisible(false)} disabled={loading} className="button ghost">
            Back to {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <form onSubmit={handleOnSubmit} className="form sign-in-form">
          <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
          <span>or use your email for registration</span>
          {isSignUp && (
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              placeholder="Name"
              className="input"
            />
          )}
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            className="input"
          />
          {isSignUp ? (
            <div className="button-container">
              <button type="submit" disabled={loading} className="button">
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
              <button type="button" onClick={() => setIsSignUp(false)} className="button ghost">
                Already have an account? Sign In
              </button>
            </div>
          ) : (
            <div className="button-container">
              <button type="button" onClick={handleGoogleSignIn} disabled={loading} className="button google-btn">
                <span className="google-icon"></span>
                Sign In with Google
              </button>
              <button type="submit" disabled={loading} className="button">
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              <a href="#" onClick={() => setResetFormVisible(true)} className="link">
                Forgot your password?
              </a>
              <button type="button" onClick={() => setIsSignUp(true)} className="button ghost">
                Create an account
              </button>
            </div>
          )}
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default SignIn;
