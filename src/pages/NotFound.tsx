import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-md w-full text-center bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-xl backdrop-blur-md border border-gray-300 dark:border-gray-700">
        <h1 className="text-6xl font-extrabold mb-4 text-blue-500 dark:text-blue-400">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-colors duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
