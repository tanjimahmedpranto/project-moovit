import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import About from "./pages/infoPages/about";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
