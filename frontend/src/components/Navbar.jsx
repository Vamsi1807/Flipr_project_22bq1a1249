
import './styles/Navbar.css';

function Navbar({ onLoginClick }) {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/images/Lead Generation Landing page (Images)/logo.svg" alt="Real Trust" />
            </div>

            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#success">Success</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a className="nav-contact" href="#contact">Contact</a></li>
                <li><button className="nav-login" onClick={onLoginClick}>Admin Login</button></li>
            </ul>
        </nav>
    );
}

export default Navbar;
