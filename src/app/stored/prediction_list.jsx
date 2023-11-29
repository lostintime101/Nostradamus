import React from 'react'
import Prediction from './prediction'

export default function PredictionList( { userPredictions } ) {
    if(userPredictions && userPredictions.length > 1) userPredictions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return(
        userPredictions.map((userPrediction) => {
            return <Prediction key={userPrediction.id} userPrediction={userPrediction}/>;
        })
    );
}
