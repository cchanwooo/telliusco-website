import Link from 'next/link'
import { getDictionary } from '../../../get-dictionary'

export const metadata = {
    title: 'Safety & Compliance | Telliusco',
    description: 'Our commitment to safety, E-Verify compliance, and insurance coverage.'
}

export default async function SafetyPage(props) {
    const params = await props.params;
    const { lang } = params;
    const dictionary = await getDictionary(lang)

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#00205B', marginBottom: '2rem', textAlign: 'center' }}>Safety & Compliance</h1>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', marginBottom: '3rem' }}>
                <h2 style={{ color: '#00205B', marginBottom: '1rem' }}>Our Safety Promise</h2>
                <p style={{ lineHeight: '1.8', color: '#333' }}>
                    At Telliusco, we believe that no placement is worth an injury. We actively partner with our clients to ensure every work site meets rigorous safety standards.
                    Our candidates undergo mandatory safety orientation before they step foot on your job site.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <h3 style={{ color: '#00205B', marginBottom: '0.5rem' }}>E-Verify Compliant</h3>
                    <p>We use the federal E-Verify system to confirm the eligibility of our employees to work in the United States.</p>
                </div>
                <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <h3 style={{ color: '#00205B', marginBottom: '0.5rem' }}>Workers' Compensation</h3>
                    <p>We carry full Workers' Compensation and General Liability insurance to protect our clients and workers.</p>
                </div>
                <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <h3 style={{ color: '#00205B', marginBottom: '0.5rem' }}>Screening Process</h3>
                    <p>Our screening includes background checks, drug testing (5-panel to 12-panel), and skills verification.</p>
                </div>
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <Link href={`/${lang}/hire`} className="btn btn-primary">Request a Safety Audit</Link>
            </div>
        </div>
    )
}
