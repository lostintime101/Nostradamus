import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const RPC = process.env.SOLANA_RPC;
const SECRET = process.env.SOLANA_PRIVATE_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js"

const solanaRpc = `https://orbital-few-diamond.solana-devnet.quiknode.pro/${RPC}/`;
const connection = new Connection(solanaRpc);

const secret = SECRET.split(",")
const fromKeypair = Keypair.fromSecretKey(new Uint8Array(secret))


const handleInserts = async (payload) => {
    
    const memo = payload.prediction_text
    console.log('memo: ', memo);
    await tx.add(
        new TransactionInstruction({
          keys: [{ pubkey: fromKeypair.publicKey, isSigner: true, isWritable: true }],
          data: Buffer.from(memo, "utf-8"),
          programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"), 
          // Program ID of the Memo Program, NOT the sender
        })
    )

    let result = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [fromKeypair]);

    console.log("complete: ", `https://explorer.solana.com/tx/${result}?cluster=devnet`);
    return result;

}

supabase
    .from('predictios')
    .on('INSERT', handleInserts)
    .subscribe()