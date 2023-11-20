import { Connection, PublicKey } from "@solana/web3.js"

import dotenv from 'dotenv'
dotenv.config({ path: '../../../.env.local' });

let memo = "9f5c427d0d78a56ff703046f77d4d360681d6501fbb763ad1dd63561c4a66baa"
const RPC = process.env.SOLANA_RPC
const HELLO = process.env.HELLO
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
// const RPC = "22e66a6ccfc4c51bd2a01484ff2071019c67a0bc"
console.log(RPC, NEXT_PUBLIC_SUPABASE_URL, HELLO)
const endpoint = `https://orbital-few-diamond.solana-devnet.quiknode.pro/${RPC}/`
const solanaConnection = new Connection(endpoint)

const searchAddress = 'E7JqLrJkPgrGVdLxhjUG35cNt8JrFVu34mw2vUJfeM4';

const getTransactions = async(address, numTx) => {
    const pubKey = new PublicKey(address);
    let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {limit:numTx});
    
    for (const transaction of transactionList) {
        if (transaction.memo === "[64] " + memo) {
            const date = new Date(transaction.blockTime * 1000);
            console.log(`Memo: ${transaction.memo}`);
            return transaction.memo.substring(5);
        }
    }

    return "error"
    
}

console.log(await getTransactions(searchAddress, 3));