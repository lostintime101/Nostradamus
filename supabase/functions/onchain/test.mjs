import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env.local' });
const solanaRPC = process.env.SOLANA_RPC;

// https://www.quicknode.com/guides/solana-development/getting-started/how-to-use-the-solana-memo-program#create-log-memo-function

const secret = [153,80,118,72,44,231,22,196,70,63,118,163,128,4,64,139,41,174,240,216,169,28,133,49,183,231,249,102,231,214,46,22,3,91,174,177,220,202,4,95,153,234,63,43,91,135,111,225,182,27,253,242,230,30,9,107,239,137,246,30,199,25,178,95];
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