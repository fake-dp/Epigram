'use client';

import EditEpigramPage from '@/components/EditEpigram';

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  return <EditEpigramPage params={params} />;
}
