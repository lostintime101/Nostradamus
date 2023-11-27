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
        if(newValue.length === 0) setHash("") 
        else{
          const newHash = sha256(newValue);
          setHash(newHash)
          console.log("We gotta new hash yo: ", newHash)
        }
    }



    return(
        <>
        <div id="section1">
              <div className="p-4 space-y-6">
              <div>
                <label className="label">
                <span className="label-text-alt">Full prediction</span>
                </label>
                <textarea className="textarea textarea-bordered textarea-lg rounded-box w-full" 
                  ref={fullPredictionForCopy}
                  value={rawPredictionFullText}
                  rows={4}
                  read only
                ></textarea>
            </div>
          <div>
            <label htmlFor="prediction"></label>
            <input className="textarea textarea-bordered textarea-lg rounded-box w-full"
            id="prediction"
            type="text"
            rows={4}
            onChange={(e) => updateHash(e.target.value)}
            placeholder="Copy & paste the full prediction here"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text-alt">Hash generator</span>
            </label>
            <textarea className="textarea textarea-bordered textarea-lg rounded-box w-full" 
            id="hash" 
            type="text" 
            value={hash} disabled ></textarea>
          </div>
          <div>
            <p>Optional: Triple check this hash with a 3rd-party SHA-256 hash generators (external links)</p>
          </div>
          <div>
            <div>
              <Link className="underline" href="https://passwordsgenerator.net/sha256-hash-generator/">PasswordGenerator.net</Link>
            </div>
            <div>
              <Link className="underline" href="https://codebeautify.org/sha256-hash-generator">CodeBeautify.org</Link>
            </div>
            <div>
              <Link className="underline" href="https://tools.keycdn.com/sha256-online-generator">KeyCdn.com</Link>
            </div>
          </div>
        </div>
        </div>
        </> 
    );
}
