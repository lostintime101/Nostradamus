import React from 'react'
import Prediction from './prediction'

export default function PredictionList( { userPredictions } ) {
    return(
        userPredictions.map((userPrediction) => {
            return <Prediction key={userPrediction.id} userPrediction={userPrediction}/>;
        })
    );
}
