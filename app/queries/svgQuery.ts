export async function fetchSvg(char: string) {
  const res = await fetch(`/api/svg/${encodeURIComponent(char)}`);

  if (!res.ok) throw new Error("Failed to fetch SVG");
  return res.text();
}
