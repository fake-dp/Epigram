import { useRouter } from 'next/router';

export default function EpigramDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>에피그램 상세 페이지</h1>
      <p>에피그램 ID: {id}</p>
    </div>
  );
}
