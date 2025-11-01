export default function Money({ amount }: { amount: number }) {
  return <p className="text-green-500 font-bold">${amount.toFixed(2)}</p>;
}
