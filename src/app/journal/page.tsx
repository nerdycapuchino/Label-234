import React from 'react';
import Link from 'next/link';
import { fetchAPI, getStrapiMedia } from '@/lib/api';

export default async function Journal() {
  // Fetch articles from Strapi
  const strapiData = await fetchAPI('/articles', { populate: '*' });
  
  // Fallback data if Strapi is not running or no data
  const articles = strapiData?.data?.length ? strapiData.data : [
    { id: 1, attributes: { title: 'The Art of Handloom', category: 'Craftsmanship', publishedAt: '2024-10-12', coverImage: null } },
    { id: 2, attributes: { title: 'Styling for the Festive Season', category: 'Style Guide', publishedAt: '2024-10-05', coverImage: null } },
    { id: 3, attributes: { title: 'Sustainable Fashion in Modern India', category: 'Sustainability', publishedAt: '2024-09-28', coverImage: null } },
  ];

  return (
    <div className="bg-brand-warmWhite min-h-screen pt-[120px] pb-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl tracking-[0.1em] text-brand-charcoal mb-4">Journal</h1>
          <p className="text-[13px] tracking-widest uppercase opacity-70 mb-8">Stories, Style & Craft</p>
          <div className="w-12 h-[1px] bg-brand-charcoal mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article: any) => {
            const attr = article.attributes;
            // Format date
            const dateStr = attr.publishedAt ? new Date(attr.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date';
            // Extract image URL if exists
            const imageUrl = attr.coverImage?.data?.attributes?.url ? getStrapiMedia(attr.coverImage.data.attributes.url) : null;

            return (
              <Link href={`/journal/${article.id}`} key={article.id} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-brand-sand/30 mb-6 flex items-center justify-center overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt={attr.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <p className="text-[11px] uppercase tracking-widest opacity-50">Article Image</p>
                  )}
                </div>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mb-2 flex justify-between">
                  <span>{attr.category || 'Uncategorized'}</span>
                  <span>{dateStr}</span>
                </div>
                <h2 className="font-serif text-xl tracking-[0.05em] group-hover:opacity-70 transition-opacity">
                  {attr.title}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
