import { redirect } from 'next/navigation'

export default async function StudyPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params
  redirect(`/${course}/lectures`)
}
