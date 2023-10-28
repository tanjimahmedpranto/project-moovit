import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationPage from './routes/login'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationPage />}>
        </Route>
      </Routes>
    </BrowserRouter>  );
}

export default App;
