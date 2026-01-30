import { useState } from "react";

function LoginModal({ onClose, onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        // Store credentials and notify parent
        localStorage.setItem("adminUsername", username);
        localStorage.setItem("adminPassword", password);
        onLoginSuccess();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Admin Login</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="modal-actions">
                        <button type="button" className="modal-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="modal-login">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;
