import { z } from "zod";
const envSchema = z.object({
  STELLAR_NETWORK: z.enum(["testnet", "mainnet"]).default("testnet"),
  STELLAR_HORIZON_URL: z.string().url().default("https://horizon-testnet.stellar.org"),
  STELLAR_PAYMENT_ADDRESS: z.string().min(56).default("GCTUBTBCTTFKHHAC747IPRNGIUFFKAHCO5UJF6UVHCLO44SPK3VUA6PX"),
  AUTH_SECRET: z.string().min(16).default("development-secret-change-before-production")
});
export const config = envSchema.parse(process.env);
