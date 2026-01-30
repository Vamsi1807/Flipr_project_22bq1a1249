import { useState, useEffect, useRef } from "react";
import axios from "axios";
import './styles/Testimonials.css';

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [showButtons, setShowButtons] = useState(false);
    const carouselRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/clients")
            .then(res => setTestimonials(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        // Check if content is scrollable
        const checkScrollable = () => {
            if (contentRef.current) {
                const isScrollable = contentRef.current.scrollWidth > contentRef.current.clientWidth;
                setShowButtons(isScrollable);
            }
        };

        const timer = setTimeout(checkScrollable, 100);
        window.addEventListener("resize", checkScrollable);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkScrollable);
        };
    }, [testimonials]);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 350; // card width + gap
            if (direction === "left") {
                carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    return (
        <div className="testimonials-section" id="testimonials">
            <h2 className="testimonials-title">Client Testimonials</h2>

            {testimonials.length === 0 && <p className="no-data">Loading testimonials...</p>}

            <div className="carousel-wrapper">
                {showButtons && <button className="carousel-btn carousel-btn-left" onClick={() => scroll("left")}>‹</button>}
                
                <div className="carousel-container" ref={carouselRef}>
                    <div className={`testimonials-carousel ${showButtons ? 'scrollable' : ''}`} ref={contentRef}>
                        {testimonials.map((testimonial) => (
                            <div className="testimonial-card" key={testimonial.id}>
                                <p className="testimonial-text">"{testimonial.description}"</p>
                                
                                <div className="testimonial-author">
                                    {testimonial.image && (
                                        <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                                    )}
                                    <div className="author-info">
                                        <h4 className="author-name">{testimonial.name}</h4>
                                        <p className="author-role">{testimonial.designation}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showButtons && <button className="carousel-btn carousel-btn-right" onClick={() => scroll("right")}>›</button>}
            </div>

            <section className="learn-more-section">
                <img 
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop" 
                    alt="Living room" 
                    className="learn-more-image"
                />
                <div className="learn-more-overlay"></div>
                <div className="learn-more-content">
                    <p>Learn more about our listing process, so we'll assist in our additional staging and design desk</p>
                    <button className="learn-more-btn">Learn More</button>
                </div>
            </section>
        </div>
    );
}

export default Testimonials;
