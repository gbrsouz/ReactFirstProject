import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/register", {
        name: name,
        email: email,
        password: password,
      });
      alert("User registered sucessfully");
    } catch (err) {
      alert("Error trying to register user");
    }

    console.log({ name, email, password });
  };

  return (
    <div className="divRegister">
      <h2 className="h2Register">Register</h2>
      <form className="formRegister" onSubmit={handleSubmit}>
        <input
          className="inputRegister"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
        />
        <input
          className="inputRegister"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          className="inputRegister"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button className="buttonRegister" type="submit">
          Sign-up
        </button>
      </form>
      <Link to="/login" className="linkRegister">
        Already have an account? Sign-in
      </Link>
    </div>
  );
}

export default Register;
