
import React from 'react';
import { Article } from '../../data/articles';
import { DownloadIcon, LinkedInIcon, FacebookIcon, EmailIcon } from './icons/ShareIcons';

interface ArticleLayoutProps {
    article: Article;
    children: React.ReactNode;
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({ article, children }) => {
    const pageUrl = window.location.href;
    const shareText = `Check out this article: ${article.title}`;

    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.teaser)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    const emailShareUrl = `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareText)}%0A%0A${encodeURIComponent(pageUrl)}`;

    return (
        <article className="bg-white">
            <header className="relative h-64 md:h-96 w-full">
                <img src={article.heroImage} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50"></div>
            </header>

            <div className="container mx-auto px-6 -mt-24 md:-mt-32 relative z-10">
                <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
                    <p className="text-sm font-semibold text-brand-gold mb-2 uppercase tracking-wider">{article.category}</p>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-brand-navy mb-6">{article.title}</h1>
                    
                    <div className="flex items-center space-x-4 border-y border-gray-200 py-3 mb-8">
                        <span className="font-semibold text-brand-body-text">Share:</span>
                        <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors"><LinkedInIcon /></a>
                        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-gold transition-colors"><FacebookIcon /></a>
                        <a href={emailShareUrl} className="text-gray-500 hover:text-brand-gold transition-colors"><EmailIcon /></a>
                        <div className="!ml-auto">
                           <button onClick={() => window.print()} className="flex items-center space-x-2 text-sm text-gray-500 hover:text-brand-gold transition-colors">
                                <DownloadIcon />
                                <span>Download as PDF</span>
                           </button>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-brand-body-text prose-headings:text-brand-navy prose-strong:text-brand-navy prose-a:text-brand-gold">
                        {children}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArticleLayout;
