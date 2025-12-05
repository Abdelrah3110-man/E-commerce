export default function StringSlice(data, end) {
  const text = String(data ?? "");

  // CHANGED FROM 1 TO 0
  return text.length > end ? text.slice(0, end) + "..." : text;
}
