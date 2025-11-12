export default function Money({
  amount,
  className,
}: {
  amount: number | string;
  className?: string;
}) {
  const str =
    typeof amount === "number" && amount > 0
      ? `${amount.toLocaleString("vi-VN")} VND`
      : amount;
  return <div className={className}>{str}</div>;
}
