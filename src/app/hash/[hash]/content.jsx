"use client"
import PredictionWrapper from './predictionWrapper'
import Checker from './checker'
import SharePoster from './sharePoster'
import React, { useState, useEffect } from 'react'

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const userUUID = 'c8b2919b-80c7-45b0-aef0-29f7ca99097e'
// const userUUID = 'c8b2919b-80c7-45b0-aef0-29f7ca99097f'

export default function Content() {

  const [thisPrediction, setThisPrediction] = useState()
  const [rawPredictionFullText, setRawPredictionFullText] = useState()
  const [rawPrediction, setRawPrediction] = useState()
  const [rawSalt, setRawSalt] = useState()
  const [rawUser, setRawUser] = useState()
  const [rawDate, setRawDate] = useState()
  const [rawTxsHash, setRawTxsHash] = useState()
  const [rawPredictionHash, setRawPredictionHash] = useState()

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
        .ilike('prediction_hash', `${currentSuffix}%`)
  
      setThisPrediction(data)
  
      if (error) {
        console.error('Error:', error.message);
      } else {
        console.log('Data:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
      <main>
        <div id="section1" className="h-screen flex flex-col items-center justify-center">
          <PredictionWrapper rawDate={rawDate} rawTxsHash={rawTxsHash} rawPrediction={rawPrediction} rawUser={rawUser} rawPredictionHash={rawPredictionHash}/>
          <div className="p-4 space-x-6">
            <button className="btn btn-wide btn-outline btn-primary rounded-box" onClick={() => scrollToSection('section2')}>Verify Hash</button>
            <button className="btn btn-wide btn-outline btn-primary rounded-box" onClick={() => scrollToSection('section3')}>Share</button>
          </div>
        </div>
        <div id="section2" className="h-screen flex flex-col items-center justify-center">
          <Checker rawPredictionFullText={rawPredictionFullText}/>
          <div>
          <button className="btn btn-wide btn-outline btn-primary rounded-box" onClick={() => scrollToSection('section3')}>Share</button>
          </div>
        </div>
        <div id="section3" className="h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-4"> 
          <p>Right click image to download and share</p>
          <SharePoster rawDate={rawDate} rawTxsHash={rawTxsHash} rawPrediction={rawPrediction} rawUser={rawUser} rawPredictionHash={rawPredictionHash}/>
          <p>Or copy link: <span className="underline">{window.location.href}</span></p>
          <button className="btn btn-wide btn-outline btn-primary rounded-box" onClick={() => scrollToSection('section1')}>Back to top</button>
          </div>
        </div>
      </main>
    )
}