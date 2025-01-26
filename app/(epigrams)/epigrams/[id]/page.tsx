interface EpigramDetailPageProps {
    params: Promise<{
      id: string;
    }>;
  }
  
  export default async function EpigramDetailPage({ params }: EpigramDetailPageProps) {
    const { id } = await params;
  
    return (
      <div>
        <h1>에피그램 상세 페이지</h1>
        <p>에피그램 ID: {id}</p>
      </div>
    );
  }
  