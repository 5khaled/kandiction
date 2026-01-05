import type { LoaderFunctionArgs } from "react-router";

export async function loader({ context, params }: LoaderFunctionArgs) {
  const { env } = context.cloudflare as { env: CloudflareEnv };
  const char = params.char;

  if (!char) {
    return new Response("Missing char", { status: 400 });
  }

  const svgFile = `${char.codePointAt(0)?.toString(16).padStart(5, "0")}.svg`;

  const object = await env.SVG_BUCKET.get(svgFile);

  if (!object) {
    return new Response("SVG not found", { status: 404 });
  }

  const contentType = object.httpMetadata?.contentType;
  if (contentType !== "image/svg+xml") {
    console.warn(
      `Unexpected Content-Type for SVG file: ${contentType}. Expected "image/svg+xml".`,
    );
    return new Response("Invalid content type", { status: 415 });
  }

  let svgContent = await object.text();

  // Extract only the SVG element
  svgContent = svgContent.replace(
    /^[\s\S]*?(<svg[\s\S]*?<\/svg>)[\s\S]*$/i,
    "$1",
  );

  return new Response(svgContent, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
