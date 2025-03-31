import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: token } = await api.post("/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", token);
      navigate("/listUsers");
    } catch (err) {
      alert("Incoret email or password");
    }

    console.log({ email, password });
  };

  return (
    <div className="divLogin">
      <h2 className="h2Login">Login</h2>
      <form className="formLogin" onSubmit={handleSubmit}>
        <input
          className="inputLogin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          className="inputLogin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button className="buttonLogin" type="submit">
          Sign-in
        </button>
      </form>
      <Link to="/" className="linkLogin">
        Don't have an account? Sign-up
      </Link>
    </div>
  );
}

export default Login;
