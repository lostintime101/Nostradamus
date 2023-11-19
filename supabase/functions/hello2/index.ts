import { corsHeaders } from '../_shared/cors.ts'
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "https://deno.land/x/solana_web3@v1.41.0-0/mod.ts"


console.log(`Function "browser-with-cors" up and running!`)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log("req", req)
    
    const { memo } = await req.json()
    console.log("memo", memo)

    const RPC = Deno.env.get("SOLANA_RPC")
    const QUICKNODE_RPC = `https://orbital-few-diamond.solana-devnet.quiknode.pro/${RPC}/`;
    const _SOLANA_CONNECTION = await new Connection(QUICKNODE_RPC);

    const encoder = new TextEncoder()
    const SECRET = Deno.env.get("SOLANA_PRIVATE_KEY")
    console.log("Secret", SECRET)
    // const secretUint8Array = encoder.encode(SECRET)
    // const secretUint8Array = new Uint8Array(Buffer.from(SECRET, 'hex'));
    const secretUint8Array = new Uint8Array(SECRET.split(',').map(value => parseInt(value)));
    console.log("Uint8Array", secretUint8Array)
    const fromKeypair = Keypair.fromSecretKey(secretUint8Array);
    console.log("public key", fromKeypair.publicKey)
    const tx = new Transaction();
    
    tx.add(
      new TransactionInstruction({
        keys: [{ pubkey: fromKeypair.publicKey, isSigner: true, isWritable: true }],
        data: memo,
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"), // Program ID of the Memo Program, NOT the sender
      })
    )
    console.log("tx", tx)

    // Sign the transaction with our private key
    const result = await sendAndConfirmTransaction(_SOLANA_CONNECTION, tx, [fromKeypair])
    console.log("complete: ", `https://explorer.solana.com/tx/${result}?cluster=devnet`)
    // console.log("complete: ", `https://explorer.solana.com/tx/${result.transactionSignature}?cluster=devnet`);
  
  
    const data = {
      message: `Hash: ${memo}`,
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})