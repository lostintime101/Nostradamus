'use client'
import React, { useState, useEffect } from 'react'
import sha256 from 'js-sha256';

export default function Prediction() {

  const crypto = require('crypto');
  const [prediction, setPrediction] = useState('')
  const [salt, setSalt] = useState('')
  const [hash, setHash] = useState('')

  let twitterId = "dummyTwitterID"
  

  function generateSalt() {
    return crypto.randomBytes(8).toString('hex');
  }

    const updateHash = () => {
        const final = "Prediction: " + prediction + "\nTwitter ID: " + twitterId + "\nSalt: " + salt
        const newHash = sha256(final);
        setHash(newHash)
        console.log("final: ", final, "hash: ", newHash)
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

  return (
    <>
    <div>
        <label htmlFor="prediction">New Prediction</label>
        <input
        type="text"
        onChange={(e) => handlePredictionChange(e)}
        placeholder="Enter prediction, max 300 chars"
      />
    </div>
    <div>
        <label htmlFor="id">Twitter ID</label>
        <input
        type="text"
        value={twitterId} disabled
        />
    </div>
    <div>
        <label htmlFor="salt">Salt</label>
        <input
        id="salt"
        type="text"
        value={salt}
        />
        <button onClick={() => setSalt(generateSalt())}>Regenerate</button>
    </div>
    <div>
        <label htmlFor="hash">Hash</label>
        <input
        id="hash"
        type="text"
        value = {hash}
        />
    </div>
    <button
        //   onClick={() => validate input, call backend edge function}
        >Create</button>
    </>
  )
}
