import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function SignUp() {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate(); 

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password } = state;
    setLoading(true);
    setError('');

    try {
      // Send sign-up data to the backend
      const response = await axios.post('http://localhost:3000/signup', { name, email, password });
      console.log('Sign-Up successful:', response.data);
      alert(`Account created for email: ${email}`);
      // Redirect to login page on successful sign-up
      navigate('/signin');
      setState({
        name: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Sign-Up error:', error);
      setError('Error signing up. Please try again.');
    } finally {
      setLoading(false);
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
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
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

        .error {
          color: red;
          font-size: 14px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}

export default SignUp;
