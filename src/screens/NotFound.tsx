import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="404 Not Found"
        className="w-40 h-40"
      />

      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Button onClick={() => navigator("/")} className="mt-4 ">
        Go to Login
      </Button>
    </div>
  );
};

export default NotFound;
