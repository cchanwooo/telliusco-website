import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '../../../../get-dictionary'

export async function generateStaticParams() {
    return [
        { slug: 'temporary' },
        { slug: 'temp-to-hire' },
        { slug: 'direct-hire' },
        { slug: 'managed' }, // On-site
    ]
}

export async function generateMetadata(props) {
    const params = await props.params;
    const { lang, slug } = params;

    const titleMap = {
        'temporary': 'Temporary Staffing',
        'temp-to-hire': 'Temp-to-Hire Staffing',
        'direct-hire': 'Direct Hire Recruiting',
        'managed': 'On-Site Managed Services'
    }

    const title = titleMap[slug] || 'Staffing Solutions'
    return {
        title: `${title} | Telliusco`,
        description: `Expert ${title} solutions for your business.`
    }
}

export default async function SolutionPage(props) {
    const params = await props.params;
    const { lang, slug } = params;
    const dictionary = await getDictionary(lang)
    const t = dictionary.cityPage.sectionB.services // Reuse existing keys slightly

    // Static content map since dictionary is keys-only for some parts
    let content = {
        title: '',
        desc: '',
        details: ''
    };

    switch (slug) {
        case 'temporary':
            content.title = t.temp; // "Temporary Staffing"
            content.desc = t.tempDesc;
            content.details = "Perfect for seasonal peaks, covering vacations, or special projects. We handle payroll, insurance, and taxes.";
            break;
        case 'temp-to-hire':
            content.title = t.tempHire;
            content.desc = t.tempHireDesc;
            content.details = "Evaluate a worker’s performance and culture fit before making a permanent commitment. Reduce your hiring risk significantly.";
            break;
        case 'direct-hire':
            content.title = t.direct;
            content.desc = t.directDesc;
            content.details = "We source, screen, and interview top talent for your critical permanent roles. You only pay when you hire.";
            break;
        case 'managed': // "on-site"
            content.title = "On-Site Managed Services";
            content.desc = "High-volume staffing management directly at your facility.";
            content.details = "For facilities with 50+ contingent workers, we provide an on-site manager to handle attendance, performance, and immediate scaling needs.";
            break;
        default:
            notFound();
    }

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px' }}>
            <Link href={`/${lang}/hire`} style={{ color: '#666', marginBottom: '2rem', display: 'inline-block' }}>&larr; Back to Solutions</Link>

            <h1 style={{ fontSize: '3rem', color: '#00205B', marginBottom: '1.5rem' }}>{content.title}</h1>
            <p style={{ fontSize: '1.5rem', color: '#444', marginBottom: '2rem' }}>{content.desc}</p>

            <div style={{ background: '#fff', padding: '2rem', borderLeft: '4px solid #FFB81C', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{content.details}</p>
            </div>

            <div style={{ padding: '3rem', background: '#00205B', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem', color: 'white' }}>Ready to get started?</h2>
                <p style={{ marginBottom: '2rem', opacity: '0.9' }}>Fill out our simple request form and we will call you back shortly.</p>
                <Link href={`/${lang}/hire`} className="btn" style={{ background: '#FFB81C', color: '#00205B', border: 'none' }}>Request {content.title}</Link>
            </div>
        </div>
    )
}
