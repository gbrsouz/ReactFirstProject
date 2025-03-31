import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ListUsers from "./Pages/List";

function App() {
  return (
    <BrowserRouter>
      <header className="headerApp">
        <h1 className="h1App">User Register System</h1>
      </header>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listUsers" element={<ListUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
