
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../../data/articles';

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-5.25-11.494v11.494l5.25-2.626 5.25 2.626V6.253L12 3.627 6.75 6.253z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m5.25-11.494v11.494l-5.25-2.626-5.25 2.626V6.253L12 3.627l5.25 2.626z" />
    </svg>
);

const ArticlesPage: React.FC = () => {
    useEffect(() => {
        const newDescription = "Read The Legacy Playbook. A collection of expert articles, case studies, and strategic insights for New Jersey families to protect and grow their wealth.";
        
        document.querySelector('meta[name="description"]')?.setAttribute('content', newDescription);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', newDescription);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', newDescription);
    }, []);

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy">
                        The Legacy Protection <span className="text-brand-gold">Library</span>
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-brand-body-text">
                        Timeless strategies, modern tools, and the expert analysis you need to secure your family's legacy.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {articles.map((article, index) => (
                        <Link to={`/articles/${article.slug}`} key={index} className="block bg-white border-2 border-brand-gold rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group">
                            <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                <img src={article.heroImage} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="p-6">
                                <p className="text-sm font-semibold text-brand-gold mb-2 uppercase tracking-wider">{article.category}</p>
                                <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors duration-300">{article.title}</h3>
                                <p className="text-brand-body-text mb-4 text-sm leading-relaxed">{article.teaser}</p>
                                <span className="font-semibold text-brand-gold group-hover:underline">Read More →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;