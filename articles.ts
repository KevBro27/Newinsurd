
import React from 'react';
import Article1Mistake from '../pages/articles/Article1Mistake';
import Article2Legacy from '../pages/articles/Article2Legacy';
import Article3Outdated from '../pages/articles/Article3Outdated';
import Article4Audit from '../pages/articles/Article4Audit';
import Article5Parent from '../pages/articles/Article5Parent';
import Article6Trap from '../pages/articles/Article6Trap';
import Article7Armor from '../pages/articles/Article7Armor';
import Article8IUL from '../pages/articles/Article8IUL';
import Article9Transfer from '../pages/articles/Article9Transfer';
import Article10CaseStudy from '../pages/articles/Article10CaseStudy';
import Article11FounderStory from '../pages/articles/Article11FounderStory';
import Article12QuoteTool from '../pages/articles/Article12QuoteTool';
import Article13Ethos from '../pages/articles/Article13Ethos';

export interface Article {
    slug: string;
    category: string;
    title: string;
    teaser: string;
    heroImage: string;
    ContentComponent: React.FC;
}

const standardHeroImage = "https://i.postimg.cc/G27XKwQX/hero-kbjinsur.png";

export const articles: Article[] = [
    { 
        slug: "nj-insurance-mistake", 
        category: "Mistakes", 
        title: "The #1 Mistake New Jersey Residents Make With Their Life Insurance.", 
        teaser: "Discover the common and costly oversight that millions of families make and how you can correct it in less than 15 minutes.",
        heroImage: standardHeroImage,
        ContentComponent: Article1Mistake
    },
    { 
        slug: "legacy-blueprint", 
        category: "Strategy", 
        title: "The Legacy Blueprint: Why Insurance Should Be Treated as a Financial Asset.", 
        teaser: "We break down how to shift your mindset from viewing insurance as an 'expense' to using it as a powerful tool for building generational wealth.",
        heroImage: standardHeroImage,
        ContentComponent: Article2Legacy
    },
    { 
        slug: "outdated-policies", 
        category: "Disruption", 
        title: "Why Your Parent's Whole Life Policy Was a Bad Deal (And How to Avoid It).", 
        teaser: "The old way isn't always the best way. Learn about the modern, more efficient strategies that outperform outdated insurance products.",
        heroImage: standardHeroImage,
        ContentComponent: Article3Outdated
    },
    { 
        slug: "one-page-audit", 
        category: "Analysis", 
        title: "The One-Page Audit: How to Analyze Your Own Policy in 5 Minutes.", 
        teaser: "I'm giving away my internal checklist. Learn to spot the red flags, identify gaps, and understand if you're truly getting what you pay for.",
        heroImage: standardHeroImage,
        ContentComponent: Article4Audit
    },
    { 
        slug: "new-parent-playbook", 
        category: "Playbook", 
        title: "The New Parent Playbook: Protecting Your Family for Less Than a Box of Diapers.", 
        teaser: "A simple, no-nonsense guide to securing maximum protection for your growing family without breaking the bank.",
        heroImage: standardHeroImage,
        ContentComponent: Article5Parent
    },
    { 
        slug: "job-insurance-trap", 
        category: "Red Flags", 
        title: "Your Job's Life Insurance is a Trap. Here's Why.", 
        teaser: "Relying solely on your employer's benefits is one of the biggest risks you can take. I'll explain the three hidden dangers.",
        heroImage: standardHeroImage,
        ContentComponent: Article6Trap
    },
    { 
        slug: "financial-armor", 
        category: "Mindset", 
        title: "Financial Armor: Stop Thinking 'Safety Net,' Start Thinking 'Investment Shield.'", 
        teaser: "A shift in perspective can change your entire financial trajectory. Learn how to use protection as a foundation for taking bigger, smarter risks.",
        heroImage: standardHeroImage,
        ContentComponent: Article7Armor
    },
    { 
        slug: "iul-swiss-army-knife", 
        category: "Deep Dive", 
        title: "The 'Financial Swiss Army Knife': Unlocking the Power of an IUL.", 
        teaser: "Beyond the basics of Term and Whole Life lies one of the most powerful and flexible tools. Here's a simple breakdown of how it works.",
        heroImage: standardHeroImage,
        ContentComponent: Article8IUL
    },
    { 
        slug: "nj-wealth-transfer", 
        category: "Local Edge", 
        title: "The NJ Wealth Transfer: A 3-Step Plan to Ensure Your Legacy Stays Local.", 
        teaser: "Specific strategies for New Jersey residents to protect their assets from state taxes and ensure their wealth is passed on efficiently.",
        heroImage: standardHeroImage,
        ContentComponent: Article9Transfer
    },
    { 
        slug: "montclair-case-study", 
        category: "Case Study", 
        title: "How We Saved a Montclair Family $1,200/Year With a Simple Policy Audit.", 
        teaser: "A real-world, anonymous example of our Free Audit in action, showing the tangible results of a smarter strategy.",
        heroImage: standardHeroImage,
        ContentComponent: Article10CaseStudy
    },
    { 
        slug: "founder-story-mission", 
        category: "Mission", 
        title: "My Mission: Forged by Fire, Built on Trust", 
        teaser: "The personal story behind the strategy. Learn why my fight with Sickle Cell and financial collapse led me to become a strategic disruptor in insurance.",
        heroImage: standardHeroImage,
        ContentComponent: Article11FounderStory
    },
    { 
        slug: "quote-tool-advantage", 
        category: "Strategy", 
        title: "Behind the Curtain: How Our Quote & Apply Tool Gives You the Advantage", 
        teaser: "We smashed the black box of insurance quoting. Learn how our transparent tool gives you instant market access, total anonymity, and complete control.",
        heroImage: standardHeroImage,
        ContentComponent: Article12QuoteTool
    },
    {
        slug: "ethos-partnership-summary",
        category: "Partnership",
        title: "The Instant Decision: How Ethos Delivers a Policy in Minutes, Not Weeks",
        teaser: "Speed is a weapon. Learn why I partnered with Ethos to offer a 100% digital experience that delivers a final decision in minutes, not weeks.",
        heroImage: standardHeroImage,
        ContentComponent: Article13Ethos
    }
];

export const getArticleBySlug = (slug?: string): Article | undefined => {
    return articles.find(article => article.slug === slug);
}