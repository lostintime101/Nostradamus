import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env.local' });
const solanaRPC = process.env.SOLANA_RPC;
const SECRET = process.env.SOLANA_PRIVATE_KEY

// https://www.quicknode.com/guides/solana-development/getting-started/how-to-use-the-solana-memo-program#create-log-memo-function

const secret = SECRET.split(",")
const fromKeypair = Keypair.fromSecretKey(new Uint8Array(secret));

const QUICKNODE_RPC = `https://orbital-few-diamond.solana-devnet.quiknode.pro/${solanaRPC}/`;
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

async function logMemo (message) {  

    let tx = new Transaction();

    await tx.add(
        new TransactionInstruction({
          keys: [{ pubkey: fromKeypair.publicKey, isSigner: true, isWritable: true }],
          data: Buffer.from(message, "utf-8"),
          programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"), 
          // Program ID of the Memo Program, NOT the sender
        })
      )

    let result = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [fromKeypair]);

    console.log("complete: ", `https://explorer.solana.com/tx/${result}?cluster=devnet`);
    return result;

}

// async function fetchMemo() {
//   const wallet = fromKeypair.publicKey;
//   let signatureDetail = await SOLANA_CONNECTION.getSignaturesForAddress(wallet);
//   console.log('Fetched Memo: ', signatureDetail[0].memo);
// }

logMemo("This is a test2a");

// fetchMemo()