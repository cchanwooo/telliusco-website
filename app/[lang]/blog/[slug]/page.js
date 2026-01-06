import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '../../../../data/blog'

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        lang: 'en',
        slug: post.slug,
    }))
}

export async function generateMetadata(props) {
    const params = await props.params;
    const post = blogPosts.find(p => p.slug === params.slug)
    if (!post) return {}

    return {
        title: `${post.title} | Telliusco Blog`,
        description: post.summary
    }
}

export default async function BlogPost(props) {
    const params = await props.params;
    const { lang, slug } = params;
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
            <Link href={`/${lang}/blog`} style={{ color: '#666', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
                &larr; Back to Resources
            </Link>

            <article>
                <header style={{ marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#00205B', marginBottom: '1rem' }}>{post.title}</h1>
                    <time style={{ color: '#999' }}>{post.date}</time>
                </header>

                <div
                    style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            <div style={{ marginTop: '4rem', padding: '2rem', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                <h3>Looking for work or workers?</h3>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link href={`/${lang}/apply`} className="btn btn-primary">Find a Job</Link>
                    <Link href={`/${lang}/hire`} className="btn btn-accent">Request Talent</Link>
                </div>
            </div>
        </div>
    )
}
