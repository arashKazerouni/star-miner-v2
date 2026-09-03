import "./globals.css"; import type { Metadata } from "next";
export const metadata:Metadata={title:"Stellar Miner",description:"A Stellar-network reward experience. Not affiliated with Stellar Development Foundation."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
