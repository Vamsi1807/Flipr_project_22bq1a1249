import axios from "axios";
import { useEffect, useState, useRef } from "react";
import './styles/Projects.css';

function Projects() {

    const [projects, setProjects] = useState([]);
    const [showButtons, setShowButtons] = useState(false);
    const carouselRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/projects")
            .then(res => setProjects(res.data))
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
    }, [projects]);

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
        <div id="projects">
            <h2>Featured Projects</h2>
            <p className="projects-subtitle">
                Explore our portfolio of premium services and projects
            </p>

            {projects.length === 0 && <p className="no-data">No projects available</p>}

            <div className="carousel-wrapper">
                {showButtons && <button className="carousel-btn carousel-btn-left" onClick={() => scroll("left")}>‹</button>}
                
                <div className="carousel-container" ref={carouselRef}>
                    <div className={`card-list ${showButtons ? 'scrollable' : ''}`} ref={contentRef}>
                        {projects.map(project => (
                            <div className="project-card" key={project.id}>
                                {project.type && (
                                    <span className="project-type">{project.type}</span>
                                )}
                                
                                <h3 className="project-name">{project.name}</h3>
                                
                                {project.location && (
                                    <p className="project-location">📍 {project.location}</p>
                                )}

                                {project.imageUrl && (
                                    <div className="project-image-container">
                                        <img 
                                            src={project.imageUrl} 
                                            alt={project.name} 
                                            className="project-image"
                                        />
                                    </div>
                                )}

                                <button className="view-details-btn">View Details</button>
                            </div>
                        ))}
                    </div>
                </div>

                {showButtons && <button className="carousel-btn carousel-btn-right" onClick={() => scroll("right")}>›</button>}
            </div>
        </div>
    );

}

export default Projects;
