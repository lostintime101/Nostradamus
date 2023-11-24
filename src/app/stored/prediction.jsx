import React from 'react'
import Link from 'next/link';

export default function Prediction( { userPrediction } ) {
//   function handleOnChange(){
//     checkboxToggle(todo.id)
// }

  return (
    <>
      <span>{userPrediction.prediction_txt}</span>
      <br />
      <span>Created at: {userPrediction.created_at}</span>
      <br />
      <button><Link href={"/hash/" + userPrediction.prediction_hash.substring(0, 12)}>Select</Link></button>
      <br />
    </>
  )
}
