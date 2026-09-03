export type MiningSnapshot = { accruedStroops: bigint; lastUpdatedAt: Date; isMining: boolean; baseRateStroopsPerHour: bigint };
export function elapsedReward(stroopsPerHour: bigint, from: Date, now: Date) {
  const elapsedSeconds = Math.max(0, Math.floor((now.getTime() - from.getTime()) / 1000));
  return (stroopsPerHour * BigInt(elapsedSeconds)) / 3600n;
}
export function effectiveRate(base: bigint, activeBoostBps: number) { return (base * BigInt(10_000 + activeBoostBps)) / 10_000n; }
export function settleMining(state: MiningSnapshot, rate: bigint, now = new Date()): MiningSnapshot {
  if (!state.isMining) return { ...state, lastUpdatedAt: now };
  return { ...state, accruedStroops: state.accruedStroops + elapsedReward(rate, state.lastUpdatedAt, now), lastUpdatedAt: now };
}
