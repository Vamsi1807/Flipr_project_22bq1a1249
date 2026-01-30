function NotYourAverageRealtor() {
    const team = [
        {
            name: "Agent 1",
            role: "Senior Agent",
            image: "/images/Lead Generation Landing page (Images)/Ellipse 29.svg"
        },
        {
            name: "Agent 2",
            role: "Property Manager",
            image: "/images/Lead Generation Landing page (Images)/Ellipse 11.svg"
        },
        {
            name: "Agent 3",
            role: "Marketing Lead",
            image: "/images/Lead Generation Landing page (Images)/Ellipse 31.svg"
        }
    ];

    return (
        <section className="not-average-section">
            <div className="not-average-content">
                <h2>Not Your Average Realtor</h2>
                <p>
                    Our team combines expertise, creativity, and personalized service to deliver exceptional results. 
                    We understand your unique needs and work tirelessly to find the perfect property for you.
                </p>
            </div>

            <div className="team-circles">
                {team.map((member, index) => (
                    <div key={index} className="team-circle">
                        <img src={member.image} alt={member.name} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default NotYourAverageRealtor;
