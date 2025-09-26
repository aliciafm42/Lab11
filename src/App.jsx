import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header.jsx";
import Home from "./pages/Home.jsx";
import AddProfilePage from "./pages/AddProfilePage.jsx";
import About from "./pages/About.jsx";
import OtherProfiles from "./pages/OtherProfiles.jsx";
import NotFound from "./pages/NotFound.jsx";
import FetchedProfilesPage from "./pages/FetchedProfilesPages.jsx";
import ProfileDetailPage from "./pages/ProfileDetailPage.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => setDarkMode((d) => !d);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Header toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-profile" element={<AddProfilePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/other-profiles" element={<OtherProfiles />} />

          {/* Nested Routes */}
          <Route path="/fetched-profiles" element={<FetchedProfilesPage />}>
            <Route path="profile/:id" element={<ProfileDetailPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
