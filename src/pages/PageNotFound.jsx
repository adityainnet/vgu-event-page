import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-[#0D0100] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-9xl font-display text-maroon mb-4">404</h1>
      <h2 className="text-3xl font-heading mb-8">Page Not Found</h2>
      <p className="text-white/60 mb-12 text-center max-w-md font-body">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-maroon text-white rounded-full font-body tracking-widest uppercase hover:bg-ember transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
