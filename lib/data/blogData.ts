import { BlogContent } from '../type/blog';

export const blogPosts: BlogContent[] = [
  {
    id: '1',
    title: 'How to Get Started as a Creator on Xonnect',
    slug: 'how-to-start',
    content: `
      <p>Welcome to Xonnect! If you're looking to turn your passion into a sustainable career, you've come to the right place. In this guide, we'll walk you through the essential steps to get your channel up and running.</p>
      
      <h2>Step 1: Complete Your Profile</h2>
      <p>Your profile is your digital storefront. Make sure to upload a high-quality avatar and a compelling bio that tells your audience who you are and what kind of content you create.</p>
      
      <h2>Step 2: Define Your Niche</h2>
      <p>The most successful creators on Xonnect have a clear focus. Whether it's gaming, educational content, or lifestyle vlogging, consistency in your niche helps you build a dedicated following.</p>
      
      <h2>Step 3: Leverage Our Monetization Tools</h2>
      <p>Xonnect offers unique way to monetize your content through our pay-on-demand and community subscription models. Don't be afraid to experiment and see what works best for your audience.</p>
      
      <blockquote>
        "The best time to start was yesterday. The second best time is now."
      </blockquote>
      
      <p>Ready to begin your journey? Head over to your creator panel and upload your first video today!</p>
    `,
    excerpt: 'A comprehensive guide for new creators on how to set up their profile, define their niche, and start earning on Xonnect.',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072',
    author: {
      name: 'Xonnect Team',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150',
      bio: 'The official team behind Xonnect, dedicated to helping creators succeed.'
    },
    publishedAt: '2026-04-10T10:00:00Z',
    readTime: '5 min',
    views: 1240,
    likes: 85,
    allowComments: true,
    commentsCount: 12,
    comments: [
      {
        id: 'c1',
        author: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=c1' },
        content: 'Great article! This really helped me get started.',
        publishedAt: '2026-04-11T12:00:00Z'
      },
      {
        id: 'c2',
        author: { name: 'Alice Smith', avatar: 'https://i.pravatar.cc/150?u=c2' },
        content: 'Very informative. Looking forward to more content.',
        publishedAt: '2026-04-12T09:30:00Z'
      },
      ...Array.from({ length: 10 }).map((_, i) => ({
        id: `c${i + 3}`,
        author: { name: `User ${i + 3}`, avatar: `https://i.pravatar.cc/150?u=c${i + 3}` },
        content: `This is a demo comment number ${i + 3}.`,
        publishedAt: '2026-04-13T10:00:00Z'
      }))
    ],
    category: 'Creator Tips',
    tags: ['Getting Started', 'Creator Economy', 'Monetization']
  },
  {
    id: '2',
    title: 'Maximizing Your Earnings on Xonnect',
    slug: 'maximizing-earnings',
    content: `
      <p>Monetization is at the heart of the creator economy. At Xonnect, we've built a system that puts you in control of your revenue. Here's how to make the most of it.</p>
      
      <h2>Understand the Pay-on-Demand Model</h2>
      <p>Unlike traditional platforms that rely solely on ad revenue, Xonnect's pay-on-demand model allows your most loyal fans to support you directly. This creates a more stable income stream that isn't dependent on fluctuating CPMs.</p>
      
      <h2>Building a Community</h2>
      <p>Your community is your biggest asset. Engaging with your viewers through comments and live streams builds the trust necessary for them to support your work financially.</p>
      
      <p>We've seen creators increase their revenue by 300% simply by offering exclusive content through their community tiers.</p>
    `,
    excerpt: 'Learn how to use our unique pay-on-demand model and community features to significantly increase your creator revenue.',
    featuredImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=2070',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      bio: 'Creator success specialist and former full-time YouTuber.'
    },
    publishedAt: '2026-04-15T14:30:00Z',
    readTime: '7 min',
    views: 890,
    likes: 56,
    allowComments: true,
    commentsCount: 8,
    comments: [
      {
        id: 'c2-1',
        author: { name: 'Bob Wilson', avatar: 'https://i.pravatar.cc/150?u=c2-1' },
        content: 'The pay-on-demand model is a game changer!',
        publishedAt: '2026-04-16T11:00:00Z'
      }
    ],
    category: 'Monetization',
    tags: ['Revenue', 'Strategy', 'Community']
  },
  {
    id: '3',
    title: 'The Future of Live Streaming in 2026',
    slug: 'future-of-live-streaming',
    content: `
      <p>The live streaming landscape is evolving faster than ever. As we look ahead, several key trends are emerging that will define the industry.</p>
      
      <h2>Interactivity is Key</h2>
      <p>Passive viewing is a thing of the past. Future platforms will prioritize interactive elements that allow viewers to influence the stream in real-time.</p>
      
      <h2>AI-Powered Enhancements</h2>
      <p>From real-time translation to automated highlights, AI is becoming an indispensable tool for streamers, allowing them to reach a global audience with ease.</p>
    `,
    excerpt: 'Exploring upcoming trends in the live streaming industry, from interactive viewer experiences to AI-powered content creation.',
    featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070',
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      bio: 'Tech journalist and live streaming enthusiast.'
    },
    publishedAt: '2026-04-18T09:15:00Z',
    readTime: '6 min',
    views: 1560,
    likes: 120,
    allowComments: true,
    commentsCount: 25,
    comments: [],
    category: 'Industry Insights',
    tags: ['Streaming', 'Technology', 'Future']
  }
];
