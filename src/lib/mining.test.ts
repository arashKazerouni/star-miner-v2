import { describe, expect, it } from "vitest";
import { elapsedReward, effectiveRate, settleMining } from "./mining";
describe("mining engine",()=>{
  it("calculates rewards from whole elapsed seconds using stroops",()=>expect(elapsedReward(3600n,new Date(0),new Date(2_500_000))).toBe(2500n));
  it("never creates rewards from a reversed clock",()=>expect(elapsedReward(100n,new Date(1000),new Date(0))).toBe(0n));
  it("applies boost basis points exactly",()=>expect(effectiveRate(24000n,10000)).toBe(48000n));
  it("only settles active mining",()=>{const state={accruedStroops:10n,lastUpdatedAt:new Date(0),isMining:false,baseRateStroopsPerHour:3600n};expect(settleMining(state,3600n,new Date(10000)).accruedStroops).toBe(10n)})
});
