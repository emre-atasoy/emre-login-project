import './App.css'
import Login from './components/Login'
import Success from './components/Success'; // ✅ düzeltildi
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/success" element={<Success />} /> {/* ✅ düzeltildi */}
    </Routes>
  )
}

export default App;
