import React from 'react';
import '../styles/ProjectsGallery.css';

const projects = [
    {
        id: 1,
        title: "Burger Gravity",
        category: "food",
        image: "/assets/projects/burger-float.png"
    },
    {
        id: 2,
        title: "Golden Hour Burger",
        category: "food",
        image: "/assets/projects/burger-smoke.jpg"
    },
    {
        id: 3,
        title: "Freshness Macro",
        category: "food",
        image: "/assets/projects/fresh-macro.jpg"
    },
    {
        id: 4,
        title: "Intense Focus",
        category: "sport",
        image: "/assets/projects/basket-sweat.jpg"
    },
    {
        id: 6,
        title: "Olympic Focus",
        category: "sport",
        image: "/assets/projects/athlete-track.jpg"
    },
    {
        id: 7,
        title: "Court Vision",
        category: "sport",
        image: "/assets/projects/basket-overhead.jpg"
    },
    {
        id: 8,
        title: "Slam Dunk Energy",
        category: "sport",
        image: "/assets/projects/basket-dunk.jpg"
    },
    {
        id: 9,
        title: "Urban Juice Campaign",
        category: "corporate",
        image: "/assets/projects/fashion-bottle.jpg"
    }
];

const ProjectsGallery = () => {
    // Duplicate projects to create seamless loop
    const carouselItems = [...projects, ...projects];

    return (
        <section id="projects" className="section-padding container-fluid">
            <h2 className="section-title text-center">Nos Réalisations</h2>

            <div className="carousel-container">
                <div className="carousel-track">
                    {carouselItems.map((project, index) => (
                        <div key={`${project.id}-${index}`} className="carousel-item">
                            <img src={project.image} alt={project.title} loading="lazy" />
                            <div className="carousel-overlay">
                                <h3>{project.title}</h3>
                                <span>{project.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsGallery;
