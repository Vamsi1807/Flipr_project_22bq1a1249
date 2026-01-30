import { useState } from "react";
import axios from "axios";
import './styles/Subscribe.css';

function Subscribe() {

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_BASE_URL}api/subscribe`, {
            email
        })
            .then(() => {
                setStatus("Subscribed successfully");
                setEmail("");
                setTimeout(() => setStatus(""), 3000);
            })
            .catch(() => {
                setStatus("Subscription failed");
                setTimeout(() => setStatus(""), 3000);
            });
    };

    return (
        <footer className="footer-section" id="contact">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-links-group">
                        <a href="#home">Home</a>
                        <a href="#projects">Projects</a>
                        <a href="#testimonials">Testimonials</a>
                        <a href="#contact">Contact</a>
                        <a href="#about">About Us</a>
                    </div>

                    <div className="footer-newsletter">
                        <h3>Subscribe to Our Newsletter</h3>
                        <form onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Enter Email Address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                        {status && (
                            <p className={status.includes("success") ? "footer-success" : "footer-error"}>
                                {status}
                            </p>
                        )}
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Elite Properties. All rights reserved.</p>
                    <div className="social-icons">
                        <a href="#" className="social-icon">f</a>
                        <a href="#" className="social-icon">in</a>
                        <a href="#" className="social-icon">📘</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Subscribe;
