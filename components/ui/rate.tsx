import StarIcon from "@/icon/star";

export default function Rate({
  value,
  className,
  sizeStar,
}: {
  value: number;
  className?: string;
  sizeStar?: string;
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className={`flex items-center ${className}`}>
      {stars.map((star) => (
        <StarIcon
          key={star}
          className={className ? "w-1/5 aspect-1" : "h-4 w-4"}
          half={star - 0.5 === value}
          full={star <= value}
          width={sizeStar}
          height={sizeStar}
        />
      ))}
    </div>
  );
}
