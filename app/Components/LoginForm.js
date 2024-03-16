import React from "react";

const LoginForm = ({ email, setEmail, password, setPassword, handleLoginClick, handleRegisterClick, error}) => {
  return (
    <div>
      <div className="mb-12">
        <h1 className="tittle-gradient">Wordle</h1>
      </div>
      <div className="mb-12">
        <form>
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </form>
      </div>
      <div>
        <div>
          <button onClick={handleLoginClick} className="button">
            <span>Login</span>
          </button>
        </div>
        <div>
          <button onClick={handleRegisterClick} className="button">
            <span>Register</span>
          </button>
        </div>
      </div>
      <div className="items-center">
        {error && <p className="error-gradient">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
