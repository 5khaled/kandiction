// ..
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="bg-white h-dvh flex flex-col justify-center items-center gap-3">
      <h1 className="text-7xl font-bold text-emerald-500">404</h1>
      <p className="text-gray-500 font-medium">
        Oops, The page you are looking for is not found!
      </p>
      <Link
        to="/"
        className="mt-20 bg-emerald-500 text-white px-5 py-2 rounded-full active:scale-95"
      >
        Go back
      </Link>
    </div>
  );
}

export default NotFound;
