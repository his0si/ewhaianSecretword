import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegistrationPage";  // 새로 만든 회원가입 페이지 import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />  {/* 회원가입 경로 추가 */}
        
      </Routes>
    </Router>
  );
}

export default App;
