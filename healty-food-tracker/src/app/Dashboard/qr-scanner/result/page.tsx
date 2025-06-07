import { useRouter } from 'next/router';

const ResultPage: React.FC = () => {
  const router = useRouter();
  const { page } = router.query; // Get the scanned data from the query

  return (
    <div>
      <h1>Result Page</h1>
      <h2>Scanned Data:</h2>
      <p>{page}</p> {/* Display the scanned data */}
    </div>
  );
};

export default ResultPage;
