import { useRef, useState, useEffect } from 'react';
import './styles/AboutUs.css';

function AboutUs() {
    const carouselRef = useRef(null);
    const contentRef = useRef(null);
    const [showButtons, setShowButtons] = useState(false);

    const whyChooseUs = [
        {
            icon: "/images/Lead Generation Landing page (Icons)/circle-dollar-sign.svg",
            title: "Potential ROI",
            description: "Maximize your investment returns with our expert market analysis and property recommendations"
        },
        {
            icon: "/images/Lead Generation Landing page (Icons)/paintbrush-2.svg",
            title: "Design",
            description: "Premium properties with exceptional architectural design and modern amenities"
        },
        {
            icon: "/images/Lead Generation Landing page (Icons)/home.svg",
            title: "Marketing",
            description: "Strategic marketing solutions to showcase your property to qualified buyers"
        }
    ];

    const aboutImages = [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.jpg?s=612x612&w=0&k=20&c=SFybbpGMB0wIoI0tJotFqptzAYK_mICVITNdQIXqnyc=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-mzsCJmtR0KGqu2IgdK9ZT-Q6ouWwb3CRFw&s"
    ];

    useEffect(() => {
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
    }, []);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 450;
            if (direction === "left") {
                carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    return (
        <div className="about-us-complete">
            <section className="why-choose-us-section" id="success">
                <h2>Why Choose Us?</h2>
                <div className="why-cards-grid">
                    {whyChooseUs.map((item, index) => (
                        <div key={index} className="why-card">
                            <div className="why-icon">
                                <img src={item.icon} alt={item.title} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-images-grid-section">
                <div className="carousel-wrapper">
                    {showButtons && <button className="carousel-btn carousel-btn-left" onClick={() => scroll("left")}>‹</button>}
                    
                    <div className="carousel-container" ref={carouselRef}>
                        <div className={`about-images-grid ${showButtons ? 'scrollable' : ''}`} ref={contentRef}>
                            {aboutImages.map((img, index) => (
                                <div key={index} className={`grid-item grid-item-${index + 1}`}>
                                    <img src={img} alt={`About ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {showButtons && <button className="carousel-btn carousel-btn-right" onClick={() => scroll("right")}>›</button>}
                </div>
            </section>

            <section className="about-text-section" id="about">
                <h2>About Us</h2>
                <p>
                    We are a leading real estate company dedicated to helping you find your dream property. 
                    With over 15 years of experience, we provide exceptional service and expertise in the real estate market. 
                    Our team combines professionalism, innovation, and customer-centric approach to deliver outstanding results.
                </p>
                <button className="explore-btn">EXPLORE</button>
            </section>
        </div>
    );
}

export default AboutUs;
