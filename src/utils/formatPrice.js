export default function formatPrice(amount) {
  const n = typeof amount === "number" ? amount : parseFloat(amount);
  if (Number.isNaN(n)) return "0.00";
  return n.toFixed(2);
}
