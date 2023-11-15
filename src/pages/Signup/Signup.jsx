import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'; 


import './Signup.css'
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {error, signup} = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password)
  }
  
  return (
    // <div>
    //   <h2>Signup</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <span>email:</span>
    //       <input
    //         required
    //         type="email"
    //         onChange={(e) => setEmail(e.target.value)}
    //         value={email}
    //       />
    //     </label>
    //     <label>
    //       <span>password:</span>
    //       <input
    //         required
    //         type="password"
    //         onChange={(e) => setPassword(e.target.value)}
    //         value={password}
    //       />
    //     </label>
    //     <button>sign up</button>
    //     {error && <p>{error}</p>}
    //   </form>
    // </div>
    <div className="signup">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <span>Sign up</span>

          <input
            type="email"
            name="email"
            placeholder="Enter email id / username"
            className="form-control inp_text"
            id="email"
            required

            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            required
            type="password"
            name="password"
            placeholder="Enter password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button>sign up</button>
       {error && <p>{error}</p>}
{/* 

          {!isPending && <button className="btn">Sign up</button>}
          {isPending && <button className="btn" disabled>loading</button>}
          {error && <div className="error">{error}</div>} */}
        </form>
      </div>
    </div>
  )
}
