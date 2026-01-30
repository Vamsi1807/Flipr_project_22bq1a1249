import './styles/AboutUs.css';

function AboutUs() {
    const whyChooseUs = [
        {
            icon: "🏠",
            title: "Potential ROI",
            description: "Maximize your investment returns with our expert market analysis and property recommendations"
        },
        {
            icon: "🎨",
            title: "Design",
            description: "Premium properties with exceptional architectural design and modern amenities"
        },
        {
            icon: "📱",
            title: "Marketing",
            description: "Strategic marketing solutions to showcase your property to qualified buyers"
        }
    ];

    const aboutImages = [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f5d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1484542603127-984f4f7d14cb?w=400&h=300&fit=crop"
    ];

    return (
        <div className="about-us-complete">
            <section className="why-choose-us-section" id="success">
                <h2>Why Choose Us?</h2>
                <div className="why-cards-grid">
                    {whyChooseUs.map((item, index) => (
                        <div key={index} className="why-card">
                            <div className="why-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-images-grid-section">
                <div className="about-images-grid">
                    {aboutImages.map((img, index) => (
                        <div key={index} className={`grid-item grid-item-${index + 1}`}>
                            <img src={img} alt={`About ${index + 1}`} />
                        </div>
                    ))}
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
