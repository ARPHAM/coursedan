export default function Video({
  urlVid,
  className,
}: {
  urlVid: string;
  className: string;
}) {
  return (
    <div className={`aspect-video overflow-hidden shadow-lg ${className}`}>
      <iframe
        className="w-full h-full"
        src={urlVid}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
