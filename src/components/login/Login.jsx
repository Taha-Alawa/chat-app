import { toast } from "react-toastify";
import "./login.css";
import { useState } from "react";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    e.target.files[0] ? setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0])
    }) : null
  }
  
  const handleLogin = (e) => {
    e.preventDefault()
  }

  return (
    <section className="login">
      <div className="item">
        <h2>Welcome Back.</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" id="" />
          <input type="password" name="password" placeholder="Password" id="" />
          <button>Sing In</button>
        </form>
      </div>
      <div className="seprator"></div>
      <div className="item">
        <h2>Create an Account.</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            User Image</label>
          <input
            onChange={handleAvatar}
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
          />
          <input type="text" placeholder="User name" name="username" />
          <input type="email" name="email" placeholder="Email" id="" />
          <input type="password" name="password" placeholder="Password" id="" />
          <button>Sign Up</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
