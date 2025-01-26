interface EpigramDetailPageProps {
    params: {
      id: string;
    };
  }
  
  export default function EpigramDetailPage({ params }: EpigramDetailPageProps) {
    const { id } = params;
  
    return (
      <div>
        <h1>에피그램 상세 페이지</h1>
        <p>에피그램 ID: {id}</p>
      </div>
    );
  }
  