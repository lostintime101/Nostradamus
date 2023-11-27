import Link from 'next/link';

export default function PredictionWrapper ({ rawPrediction, rawUser, rawDate, rawTxsHash, rawPredictionHash }) {

    return(
      <div className="space-y-4 max-w-screen-md mx-auto flex flex-col items-center justify-center">
     
          <h2>"{(rawPrediction? rawPrediction : 'Loading...')}"</h2>
          <p>Predicted by: {(rawUser? rawUser : "Loading...")}</p>
          <p>This prediction was hashed and stored onchain at {(rawDate? rawDate + " UTC" : "Loading...")} :</p>
          <div className = "">
          <Link target="_blank" href={"https://solscan.io/tx/" + rawTxsHash + "?cluster=devnet"}><button class="btn btn-wide btn-outline btn-white bg-white text-black rounded-box">Check the Blockchain</button></Link>
          </div>        
          <p>Hash: {(rawPredictionHash? <Link target="_blank" className="underline" href={"https://solscan.io/tx/" + rawTxsHash + "?cluster=devnet"}>{rawPredictionHash}</Link> : "Loading...")}</p>
          <p>The hash should match the "Instruction Data" field</p>
        </div>
    );
}
