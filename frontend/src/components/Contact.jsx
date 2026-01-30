import { useState } from "react";
import api from "../api/api";

function Contact() {

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
            })
            .catch(() => {
                setStatus("Error sending message");
            });
    };

    return (
        <div>
            <h2>Get In Touch</h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', fontSize: '1.1rem' }}>
                We're here to help you find your perfect property
            </p>

            <div className="contact-container">
                <div className="contact-form">
                    <h3>Send us a message</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <textarea
                            placeholder="Tell us about your property needs..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            required
                        />

                        <button type="submit">Send Message</button>
                    </form>

                    {status && (
                        <p className={status.includes("success") ? "status-success" : "status-error"}>
                            {status}
                        </p>
                    )}
                </div>

                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <p style={{ color: '#666', marginBottom: '30px' }}>
                        Reach out to us through any of these channels. Our team is ready to assist you with all your real estate needs.
                    </p>

                    <div className="contact-item">
                        <div className="contact-item-icon">📍</div>
                        <div className="contact-item-content">
                            <h4>Address</h4>
                            <p>123 Real Estate Avenue<br />New York, NY 10001</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-item-icon">📞</div>
                        <div className="contact-item-content">
                            <h4>Phone</h4>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-item-icon">📧</div>
                        <div className="contact-item-content">
                            <h4>Email</h4>
                            <p>info@eliteproperties.com</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <h4 style={{ marginBottom: '15px' }}>Office Hours</h4>
                        <p style={{ color: '#666' }}>
                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                            Saturday: 10:00 AM - 4:00 PM<br />
                            Sunday: Closed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
