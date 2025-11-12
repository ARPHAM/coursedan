import StarIcon from "@/icon/star";

export default function Rate({ value }: { value: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <StarIcon
          key={star}
          className="h-4 w-4"
          half={star - 0.5 === value}
          full={star <= value}
        />
      ))}
    </div>
  );
}
