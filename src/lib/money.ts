export const STROOPS_PER_XLM = 10_000_000n;
export function formatXlm(stroops: bigint, digits = 4) {
  const negative = stroops < 0n; const abs = negative ? -stroops : stroops;
  const whole = abs / STROOPS_PER_XLM;
  const fractional = (abs % STROOPS_PER_XLM).toString().padStart(7, "0").slice(0, digits).replace(/0+$/, "");
  return `${negative ? "-" : ""}${whole}${fractional ? `.${fractional}` : ""}`;
}
export function parseXlm(value: string): bigint {
  if (!/^\d+(\.\d{1,7})?$/.test(value)) throw new Error("Invalid XLM amount");
  const [whole, fraction = ""] = value.split(".");
  return BigInt(whole) * STROOPS_PER_XLM + BigInt(fraction.padEnd(7, "0"));
}
