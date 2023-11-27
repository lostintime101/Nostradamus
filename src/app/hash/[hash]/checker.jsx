"use client"
import { createClient } from '@supabase/supabase-js'
import React, { useState, useRef } from 'react'
import Link from 'next/link';
import sha256 from 'js-sha256';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const userUUID = 'c8b2919b-80c7-45b0-aef0-29f7ca99097e'
// const userUUID = 'c8b2919b-80c7-45b0-aef0-29f7ca99097f'


export default function Checker ({ rawPredictionFullText }) {

    const [hash, setHash] = useState('')
    const fullPredictionForCopy = useRef(null)

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
