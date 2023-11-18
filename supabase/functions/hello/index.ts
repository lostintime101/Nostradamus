
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "https://deno.land/x/solana_web3@v1.41.0-0/mod.ts"

console.log("Hello from Functions!")

Deno.serve(async (req) => {
  
  const { name } = await req.json()

  const RPC = Deno.env.get("SOLANA_RPC")
  const QUICKNODE_RPC = `https://orbital-few-diamond.solana-devnet.quiknode.pro/${RPC}/`;
  const _SOLANA_CONNECTION = await new Connection(QUICKNODE_RPC);
  
  console.log(_SOLANA_CONNECTION)

  let tx = new Transaction();

  await tx.add(
      new TransactionInstruction({
        keys: [{ pubkey: fromSecretKey.publicKey, isSigner: true, isWritable: true }],
        data: Buffer.from(name, "utf-8"),
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"), 
        // Program ID of the Memo Program, NOT the sender
      })
    )

    const result = await sendAndConfirmTransaction(_SOLANA_CONNECTION, tx, [fromKeypair]);

    const new_data = {
      message: `Hello ${name}!`,
      rpc_address: Deno.env.get("SOLANA_RPC"),
      txs: `https://explorer.solana.com/tx/${result}?cluster=devnet`
    }

  return new Response(
    JSON.stringify(new_data),
    { headers: { "Content-Type": "application/json" } },
  )
})

// To invoke:
// curl -L -X POST 'https://voiooresdzvtrovknvpz.supabase.co/functions/v1/hello' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvaW9vcmVzZHp2dHJvdmtudnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NTY5NDUsImV4cCI6MjAxNTQzMjk0NX0.CxGfTVz1-VmtEi6yKzJ7R5JfJmix1JWK5PsDwnbey1A' --data '{"name":"Functions"}'
