import { useState } from "react";
import axios from "axios";

function ContactBanner() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_BASE_URL}api/contact`, {
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
        <section className="contact-banner">
            <div className="contact-banner-bg"></div>
            <div className="contact-banner-overlay"></div>
            
            <div className="contact-banner-content">
                <h2>Get In Touch</h2>
                <p>We're here to help you find your perfect property</p>

                <form className="contact-banner-form" onSubmit={handleSubmit}>
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
                        placeholder="Message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit">Send Message</button>
                </form>

                {status && (
                    <p className={status.includes("success") ? "contact-success" : "contact-error"}>
                        {status}
                    </p>
                )}
            </div>
        </section>
    );
}

export default ContactBanner;
