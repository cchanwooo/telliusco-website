import Link from 'next/link'
import { blogPosts } from '../../../data/blog'
import { getDictionary } from '../../../get-dictionary'

export const metadata = {
    title: 'Resources & Blog | Telliusco Staffing',
    description: 'Guides, tips, and industry news for job seekers and employers.'
}

export default async function BlogIndex(props) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang)

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#00205B', fontSize: '2.5rem' }}>Resources & Blog</h1>
            <p style={{ textAlign: 'center', marginBottom: '4rem', color: '#666', maxWidth: '600px', margin: '0 auto 4rem' }}>
                Latest insights on staffing, safety, and career growth in the Southeast.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {blogPosts.map(post => (
                    <div key={post.slug} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'transform 0.2s', background: 'white' }}>
                        <div style={{ padding: '2rem' }}>
                            <span style={{ fontSize: '0.85rem', color: '#999' }}>{post.date}</span>
                            <h2 style={{ fontSize: '1.25rem', margin: '0.5rem 0', color: '#00205B' }}>
                                <Link href={`/${lang}/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                {post.summary}
                            </p>
                            <Link href={`/${lang}/blog/${post.slug}`} style={{ color: '#FFB81C', fontWeight: 'bold', textDecoration: 'none' }}>
                                Read Article &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
