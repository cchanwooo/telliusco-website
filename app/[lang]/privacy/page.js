import Link from 'next/link'

export const metadata = {
    title: 'Privacy Policy | Telliusco Staffing',
    description: 'Privacy Policy for Telliusco Staffing services.'
}

export default function PrivacyPage() {
    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '900px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#00205B', marginBottom: '2rem' }}>Privacy Policy</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>Last Updated: January 1, 2026</p>

            <div className="policy-content" style={{ lineHeight: '1.8', color: '#333' }}>
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you apply for a job, request talent, or contact us. This may include your name, email address, phone number, work history, and other professional details.</p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
                    <p>We use the information we collect to communicate with you, process your job applications, provide staffing services, and comply with legal obligations (such as E-Verify).</p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>3. Information Sharing</h2>
                    <p>We do not sell your personal information. We share your information with potential employers (if you are a job seeker) or candidates (if you are an employer) only as necessary to facilitate the hiring process.</p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>4. SMS Communications</h2>
                    <p>By providing your phone number, you consent to receive periodic text messages from Telliusco regarding job openings or staffing requests. Message and data rates may apply. You can reply STOP to opt out at any time.</p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#00205B', marginBottom: '1rem' }}>5. Contact Us</h2>
                    <p>If you have questions about this policy, please contact us at 404-716-9911.</p>
                </section>
            </div>
        </div>
    )
}
