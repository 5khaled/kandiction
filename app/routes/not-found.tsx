import type { Route } from "./+types/home";

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
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
