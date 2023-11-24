import React from 'react'
import Link from 'next/link';

export default function Prediction( { userPrediction } ) {

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

  return (   
    <tr>
    <th>
      <label>
        <input type="checkbox" className="checkbox" />
      </label>
    </th>
    <td>{formatDate(userPrediction.created_at)}</td>
    <td>{userPrediction.prediction_txt.split(":")[1]}</td>
    <td>Hidden</td>
    <th>
      <Link href={"/hash/" + userPrediction.prediction_hash.substring(0, 12)}><button className="btn btn-ghost btn-sm">Reveal</button></Link>
    </th>
  </tr>
  )
}
