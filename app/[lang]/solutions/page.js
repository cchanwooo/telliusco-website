import { redirect } from 'next/navigation'

export default async function SolutionsIndex(props) {
    const params = await props.params;
    const { lang } = params;
    // Redirect /solutions -> /hire because that is the main employer landing page per instructions
    redirect(`/${lang}/hire`)
}
