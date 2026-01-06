import Link from 'next/link'

export const metadata = {
    title: 'Terms of Service | Telliusco Staffing',
    description: 'Terms and Conditions for using Telliusco Staffing website and services.'
}

export default function TermsPage() {
    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '900px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#00205B', marginBottom: '2rem' }}>Terms of Service</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>Last Updated: January 1, 2026</p>

            <div className="policy-content" style={{ lineHeight: '1.8', color: '#333' }}>
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
                    <p>By accessing and using the Telliusco Staffing website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>2. Use of Services</h2>
                    <p>You agree to use our services only for lawful purposes. You are prohibited from posting or transmitting any unlawful, threatening, libelous, defamatory, or profane material.</p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>3. Hiring & Employment</h2>
                    <p>Telliusco acts as a staffing agency. Submission of an application does not guarantee employment. All hiring decisions are based on qualifications and client needs.</p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>4. EEO Statement</h2>
                    <p>Telliusco is an Equal Opportunity Employer. We prohibit discrimination and harassment of any kind based on race, color, sex, religion, sexual orientation, national origin, disability, genetic information, pregnancy, or any other protected characteristic.</p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>5. Limitation of Liability</h2>
                    <p>Telliusco shall not be liable for any damages arising out of or in connection with the use or inability to use this website.</p>
                </section>
            </div>
        </div>
    )
}
