export default function PlaceHolderSVG({
  svgContent
}: {
  svgContent: string | null;
}) {
  return (
    svgContent && (
      <div
        dangerouslySetInnerHTML={{ __html: svgContent }}
        className="absolute rounded color-scheme-light opacity-35 [&>svg]:size-full [&_path]:stroke-white [&_text]:hidden"
      />
    )
  );
}
