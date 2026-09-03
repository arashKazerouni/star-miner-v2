import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { config } from "./config";
const key = new TextEncoder().encode(config.AUTH_SECRET);
export async function createSession(userId: string) { return new SignJWT({ sub: userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(key); }
export async function currentUserId() { const token = (await cookies()).get("sm_session")?.value; if (!token) return null; try { return (await jwtVerify(token, key)).payload.sub ?? null; } catch { return null; } }
