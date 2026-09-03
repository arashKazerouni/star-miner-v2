import { config } from "./config";
export type ChainPayment = { hash:string; amount:string; assetType:string; destination:string; memo:string | null };
export async function findIncomingPayment(memo:string):Promise<ChainPayment|undefined>{
  const url=`${config.STELLAR_HORIZON_URL}/accounts/${config.STELLAR_PAYMENT_ADDRESS}/payments?order=desc&limit=50`;
  const response=await fetch(url,{next:{revalidate:0}}); if(!response.ok) throw new Error("Horizon unavailable");
  const records=(await response.json())._embedded.records as Array<Record<string,string>>;
  for(const p of records){if(p.type!=="payment"||p.asset_type!=="native")continue; const tx=await fetch(`${config.STELLAR_HORIZON_URL}/transactions/${p.transaction_hash}`,{next:{revalidate:0}});if(!tx.ok)continue;const t=await tx.json();if(t.memo===memo)return {hash:p.transaction_hash,amount:p.amount,assetType:p.asset_type,destination:p.to,memo:t.memo};}
}
