import { useParams, Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Detail Page</h1>
      <p className="text-lg mb-4">Item ID: {id}</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
        ← Back to Index
      </Link>
    </div>
  );
}
