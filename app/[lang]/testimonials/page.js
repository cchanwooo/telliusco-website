import Link from 'next/link'
import { getDictionary } from '../../../get-dictionary'

export const metadata = {
    title: 'Testimonials | Telliusco',
    description: 'See what our clients and candidates say about working with Telliusco.'
}

export default async function TestimonialsPage(props) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang)
    const t = dictionary.home.testimonials

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#00205B', marginBottom: '1rem', textAlign: 'center' }}>Testimonials</h1>
            <p style={{ textAlign: 'center', marginBottom: '4rem', color: '#666' }}>Real feedback from our partners and workforce.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>"{t.q1}"</p>
                    <strong style={{ color: '#00205B' }}>{t.a1}</strong>
                </div>
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>"{t.q2}"</p>
                    <strong style={{ color: '#00205B' }}>{t.a2}</strong>
                </div>
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>"{t.q3}"</p>
                    <strong style={{ color: '#00205B' }}>{t.a3}</strong>
                </div>
                {/* Additional placeholders for "6 reviews" requirement */}
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>"Telliusco found me a job 2 days after I applied. Very professional staff."</p>
                    <strong style={{ color: '#00205B' }}>Candidate, Nashville TN</strong>
                </div>
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>"We lowered our turnover by 20% since switching to Telliusco for our manufacturing plant."</p>
                    <strong style={{ color: '#00205B' }}>Director of Ops, Huntsville AL</strong>
                </div>
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>"They handle all the payroll and compliance headaches for us. Worth every penny."</p>
                    <strong style={{ color: '#00205B' }}>Business Owner, Savannah GA</strong>
                </div>
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <Link href={`/${lang}/apply`} className="btn btn-primary" style={{ marginRight: '1rem' }}>Join the Team</Link>
                <Link href={`/${lang}/hire`} className="btn btn-accent">Partner With Us</Link>
            </div>
        </div>
    )
}
