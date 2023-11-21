'use client'
import { createClient } from '@supabase/supabase-js'
import React, { useState, useEffect } from 'react'
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const userUUID = 'c8b2919b-80c7-45b0-aef0-29f7ca99097e'

export default function Predictions () {

const [userPredictions, setUserPredictions] = useState([])

    useEffect(() => {
        if(userPredictions.length !== 0)
        console.log("userPredictions: ", userPredictions)
    }, [userPredictions]);

    const fetchPredictons = async () => {
        try {
        let { data, error } = await supabase
            .from('predictions')
            .select("*")
            .eq('sender', userUUID);
      
          setUserPredictions(data)
      
          if (error) {
            console.error('Error:', error.message);
          } else {
            console.log('Data:', data);
          }
        } catch (error) {
          console.error('Unexpected error:', error);
        }
      };
    
    return(
        
        <button onClick={ async () => fetchPredictons()}>Get Predictions</button>
        // todos.map((todo) => {
        //     return <ToDo key={todo.id} todo={todo} checkboxToggle={checkboxToggle}/>;
        // })

        
    );
}
