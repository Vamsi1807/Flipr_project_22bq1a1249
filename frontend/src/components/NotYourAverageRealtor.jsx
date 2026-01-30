function NotYourAverageRealtor() {
    const team = [
        {
            name: "Agent 1",
            role: "Senior Agent",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
        },
        {
            name: "Agent 2",
            role: "Property Manager",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop"
        },
        {
            name: "Agent 3",
            role: "Marketing Lead",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
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
