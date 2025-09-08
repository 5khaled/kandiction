import { Link } from "react-router";
import type { Route } from "./+types/not-found";
import { Button } from "~/components/shadcn/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 | Kandiction" },
    {
      name: "description",
      content: `The page you are looking for does not exist.`,
    },
  ];
}
const NotFound = () => {
  return (
    <div className={`h-dvh flex flex-col items-center justify-center`}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button asChild variant={"secondary"} className="my-4">
        <Link to="/">Go Back</Link>
      </Button>
    </div>
  );
};

export default NotFound;
