import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NotYourAverageRealtor from "./components/NotYourAverageRealtor";
import AboutUs from "./components/AboutUs";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Subscribe from "./components/Subscribe";
import Admin from "./components/Admin";
import LoginModal from "./components/LoginModal";
import "./App.css";

function App() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const isAdmin = window.location.pathname.startsWith("/admin");

    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        window.location.href = "/admin";
    };

    if (isAdmin) {
        return <Admin />;
    }

    return (
        <div className="container">
            <Navbar onLoginClick={() => setShowLoginModal(true)} />
            {showLoginModal && (
                <LoginModal 
                    onClose={() => setShowLoginModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
            <Hero />
            <NotYourAverageRealtor />
            <AboutUs />
            <Projects />
            <Testimonials />
            <Subscribe />
        </div>
    );
}

export default App;
