
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleBySlug } from '../data/articles';
import ArticleLayout from '../components/ArticleLayout';

const ArticleDetailPage: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const navigate = useNavigate();
  const article = getArticleBySlug(articleSlug);

  useEffect(() => {
    if (!article) {
      // If no article is found for the slug, redirect to the main articles page.
      navigate('/articles', { replace: true });
    }
  }, [article, navigate]);

  if (!article) {
    // Render nothing while redirecting
    return null;
  }
  
  const { ContentComponent } = article;

  return (
    <ArticleLayout article={article}>
        <ContentComponent />
    </ArticleLayout>
  );
};

export default ArticleDetailPage;
