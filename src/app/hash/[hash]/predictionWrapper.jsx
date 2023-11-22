'use client'
import { createClient } from '@supabase/supabase-js'
import React, { useState, useEffect } from 'react'
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const userUUID = 'c8b2919b-80c7-45b0-aef0-29f7ca99097e'
// const userUUID = 'c8b2919b-80c7-45b0-aef0-29f7ca99097f'

export default function PredictionWrapper () {

const [thisPrediction, setThisPrediction] = useState()

    useEffect(() => {
        fetchPredicton()
    }, []);

    const fetchPredicton = async () => {
        const currentUrl = window.location.href;
        const currentSuffix = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

        try {
        let { data, error } = await supabase
            .from('predictions')
            .select("*")
            .eq('sender', userUUID)
            .eq('prediction_hash', currentSuffix);
      
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
    
    return(
        <>
        <p>{(thisPrediction && thisPrediction[0]? thisPrediction[0].prediction_txt : "Prediction not found")}</p>
        <br></br>
        <p>Created at: {(thisPrediction && thisPrediction[0]? thisPrediction[0].created_at : "No date")}</p>

        <button>Share</button>

        </> 
    );
}
