export default function Money({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return <div className={className}>{amount.toLocaleString("vi-VN")} VND</div>;
}
