'use client'
import { createClient } from '@supabase/supabase-js'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import sha256 from 'js-sha256';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const userUUID = 'c8b2919b-80c7-45b0-aef0-29f7ca99097e'
// const userUUID = 'c8b2919b-80c7-45b0-aef0-29f7ca99097f'


export default function PredictionWrapper () {

const [thisPrediction, setThisPrediction] = useState()
const [rawPredictionFullText, setRawPredictionFullText] = useState()
const [rawPrediction, setRawPrediction] = useState()
const [rawSalt, setRawSalt] = useState()
const [rawUser, setRawUser] = useState()
const [rawDate, setRawDate] = useState()
const [rawTxsHash, setRawTxsHash] = useState()
const [rawPredictionHash, setRawPredictionHash] = useState()
const [hash, setHash] = useState('')

const fullPredictionForCopy = useRef(null)

    useEffect(() => {
        fetchPredicton()
    }, []);
    
    useEffect(() => {

      if(thisPrediction && thisPrediction[0] && thisPrediction[0].prediction_txt){
  
        const regex = /Prediction: (.*?)\s+Twitter ID: (.*?)\s+Salt: (.*)/;
        const match = thisPrediction[0].prediction_txt.match(regex);
        setRawPrediction(match[1])
        setRawUser(match[2])
        setRawSalt(match[3])
        setRawDate(formatDate(thisPrediction[0].created_at))
        setRawTxsHash(thisPrediction[0].txs_hash)
        setRawPredictionHash(thisPrediction[0].prediction_hash)
        setRawPredictionFullText(thisPrediction[0].prediction_txt)
  
        console.log("henlo", rawPrediction, rawUser, rawSalt, rawDate, rawTxsHash, rawPredictionHash)

      }

      function formatDate(inputDate) {
        const dateParts = inputDate.split(/[- :]/);
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        const hour = parseInt(dateParts[3]);
        const minute = parseInt(dateParts[4]);

        const inputDateTime = new Date(Date.UTC(year, month - 1, day, hour, minute));
      
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC"
        };
      
        const formattedDate = inputDateTime.toLocaleString("en-US", options);
        return formattedDate;
      }

    }, [thisPrediction]);

    const fetchPredicton = async () => {
        const currentUrl = window.location.href;
        const currentSuffix = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        if(currentSuffix.length != 12) return console.error("error, incorrect suffix length");

        try {
        let { data, error } = await supabase
            .from('predictions')
            .select("*")
            .eq('sender', userUUID)
            .ilike('prediction_hash', `${currentSuffix}%`)
      
          setThisPrediction(data)
      
          if (error) {
            console.error('Error:', error.message);
          } else {
            console.log('Dataaaaaaaa:', data);
          }
        } catch (error) {
          console.error('Unexpected error:', error);
        }
      };

      async function copyToClipboard(){
        try {
          await navigator.clipboard.writeText(fullPredictionForCopy.current.value);
          console.log('Text successfully copied to clipboard');
        } catch (err) {
          console.error('Unable to copy text to clipboard', err);
        }
      }

    const updateHash = (newValue) => {
        const newHash = sha256(newValue);
        setHash(newHash)
        console.log("We gotta new hash yo: ", newHash)
    }

    return(
        <>
        <p>Prediction: {(rawPrediction? rawPrediction : "No prediction")}</p>
        <br></br>
        <p>Created by: {(rawUser? rawUser : "No creator")}</p>
        <br></br>
        <p>Hash salt: {(rawSalt? rawSalt : "No hash salt")}</p>
        <br></br>
        <p>Created at: {(rawDate? rawDate + " UTC" : "No date")}</p>
        {/* <br></br>
        <p>Txs Hash: {(rawTxsHash? rawTxsHash : "No txs hash")}</p> */}
        <br></br>
        <p>View onchain data: {(rawTxsHash? <Link href={"https://explorer.solana.com/tx/" + rawTxsHash + "?cluster=devnet"}>Solana Block Explorer</Link> : "No txs hash")}</p>
        <br></br>
        
        <button onclick="scrollToSection('section1')">Verify</button>
        <button onclick="scrollToSection('section2')">Share</button>

        <div id="section1">
          <p>Full prediction</p>
            <input class="overflow-auto max-h-40 border p-4 bg-white" 
              ref={fullPredictionForCopy}
              value={rawPredictionFullText}
              readOnly
            />
          <button onClick={copyToClipboard}>Copy</button>
          <div>
            <label htmlFor="prediction">Pastebin</label>
            <input 
            id="prediction"
            type="text"
            onChange={(e) => updateHash(e.target.value)}
            placeholder="Copy & Paste full prediction in here"
            />
          </div>
          <div>
            <label htmlFor="hash">Hash</label>
            <input id="hash" type="text" value={hash} readOnly />
          </div>
          
          <br></br>
            <p>Triple check this hash with a 3rd-party SHA-256 hash generators (external links)</p>
            <Link href="https://passwordsgenerator.net/sha256-hash-generator/">PasswordGenerator.net</Link>
            <Link href="https://codebeautify.org/sha256-hash-generator">CodeBeautify.org</Link>
            <Link href="https://tools.keycdn.com/sha256-online-generator">KeyCdn.com</Link>
          <br></br>

        </div>
        </> 
    );
}
