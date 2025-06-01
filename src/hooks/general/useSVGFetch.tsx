import { useEffect, useState } from "react";

export const useSVGFetch = (url: string) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setSvgContent(null);

    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const svgText = await response.text();

        // Extract the <svg> only
        const svgOnly = svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[0];

        if (svgOnly) {
          setSvgContent(svgOnly);
        } else {
          setIsError(true);
          console.error("SVG content not found");
        }
      } catch (error) {
        console.error("Error fetching SVG:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSvg();
  }, [url]);

  return { svgContent, isLoading, isError };
};
