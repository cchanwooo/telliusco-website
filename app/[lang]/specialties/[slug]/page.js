import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '../../../../get-dictionary'

export async function generateStaticParams() {
    return [
        { slug: 'manufacturing' },
        { slug: 'warehouse' },
        { slug: 'clerical' },
        { slug: 'construction' },
    ]
}

export async function generateMetadata(props) {
    const params = await props.params;
    const { lang, slug } = params;
    const dictionary = await getDictionary(lang)

    const keyMap = {
        'manufacturing': dictionary.specialties.mfg.title,
        'warehouse': dictionary.specialties.warehouse.title,
        'clerical': dictionary.specialties.office.title,
        'construction': dictionary.specialties.construction.title
    }

    const title = keyMap[slug] || 'Specialty'
    return {
        title: `${title} Staffing | Telliusco`,
        description: `Reliable ${title} staffing services.`
    }
}

export default async function SpecialtyPage(props) {
    const params = await props.params;
    const { lang, slug } = params;
    const dictionary = await getDictionary(lang)
    const t = dictionary.specialties

    // Map slug to dict key
    let data = null;
    let imageIcon = '';

    switch (slug) {
        case 'manufacturing':
            data = t.mfg;
            imageIcon = '🏭';
            break;
        case 'warehouse':
            data = t.warehouse;
            imageIcon = '📦';
            break;
        case 'clerical':
            data = t.office;
            imageIcon = '💻';
            break;
        case 'construction':
            data = t.construction;
            imageIcon = '🚧';
            break;
        default:
            notFound();
    }

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '900px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>{imageIcon}</span>
                <h1 style={{ fontSize: '3rem', color: '#00205B', marginBottom: '1rem' }}>{data.title}</h1>
                <p style={{ fontSize: '1.25rem', color: '#666' }}>{data.desc}</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>Why Telliusco for {data.title}?</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{data.value}</p>
                <br />
                <p>We screen candidates specifically for the skills required in {data.title}, ensuring you get productive workers from Day 1.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ padding: '2rem', border: '2px solid #00205B', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>For Employers</h3>
                    <p style={{ marginBottom: '1.5rem' }}>Need reliable {data.title} staff?</p>
                    <Link href={`/${lang}/hire`} className="btn btn-primary">Request Talent</Link>
                </div>
                <div style={{ padding: '2rem', border: '2px solid #FFB81C', borderRadius: '8px', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>For Job Seekers</h3>
                    <p style={{ marginBottom: '1.5rem' }}>Looking for {data.title} jobs?</p>
                    <Link href={`/${lang}/apply`} className="btn btn-accent">Apply Now</Link>
                </div>
            </div>
        </div>
    )
}
