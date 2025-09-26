import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header.jsx";
import Home from "./pages/Home.jsx";
import AddProfilePage from "./pages/AddProfilePage.jsx";
import About from "./pages/About.jsx";
import OtherProfiles from "./pages/OtherProfiles.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => setDarkMode((d) => !d);

  return (
    <Router>
      <div className={darkMode ? "app dark" : "app"}>
        <Header toggleMode={toggleMode} />
        <main style={{ paddingTop: 64 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-profile" element={<AddProfilePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/other-profiles" element={<OtherProfiles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
