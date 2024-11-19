import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./view/Home.js";

function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
