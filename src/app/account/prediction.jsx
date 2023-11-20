'use client'
import { createClient } from '@supabase/supabase-js'
import React, { useState, useEffect } from 'react'
import { Connection, PublicKey } from "@solana/web3.js"
import sha256 from 'js-sha256';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const RPC = "22e66a6ccfc4c51bd2a01484ff2071019c67a0bc"
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Prediction() {

  const crypto = require('crypto');
  const [prediction, setPrediction] = useState('')
  const [salt, setSalt] = useState('')
  const [hash, setHash] = useState('')
  const [final, setFinal] = useState('')
  const [txsHash, setTxsHash] = useState('')

  const twitterId = "dummyTwitterID"
  

  function generateSalt() {
    return crypto.randomBytes(8).toString('hex');
  }

    const updateHash = () => {
        const combination = "Prediction: " + prediction + "\nTwitter ID: " + twitterId + "\nSalt: " + salt
        const newHash = sha256(combination);
        setHash(newHash)
        setFinal(combination)
        console.log("final: ", combination, "hash: ", newHash)
    }

    useEffect(() => {
        // TODO: get the Twitter ID from auth state
        setSalt(generateSalt())
      }, []);

    useEffect(() => {
        if (prediction === "") setHash("")
        else updateHash()
      }, [prediction, salt]);


    const handlePredictionChange = (e) => {
        setPrediction(e.target.value)
    };

    const putOnchain = async () => {

    // CALLING MEMO TXS
      try {
        const response = await fetch('https://nostradamus-server-git-main-lostintime101s-projects.vercel.app/', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ memo: hash }),
        });

        const data = await response.json();
        console.log("This is your datoooor: ", data);

        return data

      } catch (error) {
        console.error("This is an Erroooor: ", error);
      }
    };

    const getTransactionHash = async () => {

      // GETTING TXS HASH
      try {

        let memo = hash // hash
        console.log(hash) 
        const endpoint = `https://orbital-few-diamond.solana-devnet.quiknode.pro/${RPC}/`
        const solanaConnection = new Connection(endpoint)
        const searchAddress = 'E7JqLrJkPgrGVdLxhjUG35cNt8JrFVu34mw2vUJfeM4';
        const pubKey = new PublicKey(searchAddress);
        let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {limit: 10});
          
        for (const transaction of transactionList) {
            if (transaction.memo === "[64] " + memo) {        
                setTxsHash(transaction.signature)
                console.log("complete: ", `https://explorer.solana.com/tx/${transaction.signature}?cluster=devnet`)
                return transaction.signature
            }
      
        return "error, can't get transaction signature"
          
      }
          
        } catch (error) {
          console.error("This is an Erroooor: ", error);
        }
      };

    const updateDb = async () => {
      // UPDATING DB
      try {
        const { data, error } = await supabase
          .from('predictions')
          .insert([
            {
              sender: 'c8b2919b-80c7-45b0-aef0-29f7ca99097e',
              prediction_txt: final,
              prediction_hash: hash
            }
          ])
          .select();
    
        console.log("error: ", error);
    
        if (error) {
          console.error('Error:', error.message);
        } else {
          console.log('Data:', data);
        }
      } catch (error) {
        alert('Error loading user data!');
        console.error('Unexpected error:', error);
      }
    };
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  return (
    <>
    <div>
        <label htmlFor="prediction">New Prediction</label>
        <input type="text"
        onChange={(e) => handlePredictionChange(e)}
        placeholder="Enter your prediction here"
      />
    </div>
    <div>
        <label htmlFor="id">Twitter ID</label>
        <input type="text" value={twitterId} disabled />
    </div>
    <div>
        <label htmlFor="salt">Salt</label>
        <input id="salt" type="text" value={salt} readOnly />
        <button onClick={() => setSalt(generateSalt())}>Regenerate</button>
    </div>
    <div>
        <label htmlFor="hash">Hash</label>
        <input id="hash" type="text" value = {hash} readOnly />
    </div>
    <button
        onClick={ async () => {
          putOnchain()
          await sleep(15000);
          await getTransactionHash()
          updateDb()
        }}
        >Create</button>
    </>
  )
}
