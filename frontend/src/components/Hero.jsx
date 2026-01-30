import { useState } from "react";
import api from "../api/api";
import './styles/Hero.css';

function Hero() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post(`contact`, {
            name,
            email,
            phone,
            city,
            message
        })
            .then(() => {
                setStatus("Message sent successfully");
                setName("");
                setEmail("");
                setPhone("");
                setCity("");
                setMessage("");
                setTimeout(() => setStatus(""), 3000);
            })
            .catch(() => {
                setStatus("Error sending message");
                setTimeout(() => setStatus(""), 3000);
            });
    };

    return (
        <section className="hero-new" id="home">
            <img
                src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&h=600&fit=crop"
                alt="Consultation, Design & Marketing"
                className="hero-background-image"
            />
            <div className="hero-overlay"></div>
            
            <div className="hero-content">
                <div className="hero-text-box">
                    <h1>Consultation,<br/>Design,<br/>& Marketing</h1>
                </div>

                <div className="hero-form-box">
                    <h3>Get in Touch<br/>with Our Experts</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <textarea
                            placeholder="Tell us your needs..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <button type="submit">Send Message</button>
                    </form>
                    {status && (
                        <p className={status.includes("success") ? "hero-success" : "hero-error"}>
                            {status}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Hero;
                        