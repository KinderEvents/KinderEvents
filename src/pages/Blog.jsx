
import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import NewsletterSignup from '../components/NewsletterSignup';
import '../styles/Blog.css';

const articles = [
    {
        id: 1,
        title: "Tuto : Créer un Spot Publicitaire 'Food' avec Kling AI",
        excerpt: "La recette complète : Prompts exacts pour la fumée, l'éclairage 'Golden Hour' et le sound design ASMR. Transformez une photo fixe en vidéo virale.",
        category: "Recette / Tuto",
        date: "10 Oct 2025",
        author: "Leo VisionR",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Guide : Maîtriser les Textures Liquides sur Runway Gen-3",
        excerpt: "Comment prompter l'eau, le soda et le miel pour un rendu hyper-réaliste. Les paramètres 'Motion Brush' à connaître absolument.",
        category: "Recette / Technique",
        date: "08 Oct 2025",
        author: "Sarah Content",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Flux Pro 1.1 : Le Secret des Portraits IA Indétectables",
        excerpt: "Notre workflow pour générer des acteurs IA ultra-réalistes et les animer avec HeyGen sans l'effet 'Uncanny Valley'.",
        category: "Workflow",
        date: "05 Oct 2025",
        author: "Team VisionR",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Sora vs Kling : Le Comparatif 2025",
        excerpt: "Nous avons testé les 3 géants de la génération vidéo IA sur les mêmes prompts. Les résultats sont surprenants.",
        category: "Actu IA",
        date: "01 Oct 2025",
        author: "Team VisionR",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        title: "5 Tendances 'UGC IA' pour TikTok",
        excerpt: "Pourquoi les marques abandonnent les influenceurs humains pour des avatars IA. Décryptage d'une tendance lourde.",
        category: "Marketing",
        date: "28 Sept 2025",
        author: "Sarah Content",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
    }
];

const Blog = () => {
    return (
        <div className="blog-page section-padding container">
            <header className="blog-header text-center">
                <h1 className="section-title">Le Blog VisionR</h1>
                <p className="blog-subtitle">
                    Explorez les frontières de la création vidéo IA. Tutoriels, analyses et veille technologique pour rester en avance.
                </p>
            </header>

            <div className="articles-grid">
                {articles.map((article) => (
                    <article key={article.id} className="article-card glass-panel">
                        <div className="article-image">
                            <img src={article.image} alt={article.title} />
                            <span className="category-tag"><Tag size={14} /> {article.category}</span>
                        </div>
                        <div className="article-content">
                            <div className="article-meta">
                                <span><Calendar size={14} /> {article.date}</span>
                                <span><User size={14} /> {article.author}</span>
                            </div>
                            <h3>{article.title}</h3>
                            <p>{article.excerpt}</p>
                            <button className="read-more">
                                Lire l'article <ArrowRight size={16} />
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <div style={{ marginTop: '5rem' }}>
                <NewsletterSignup />
            </div>
        </div>
    );
};

export default Blog;
