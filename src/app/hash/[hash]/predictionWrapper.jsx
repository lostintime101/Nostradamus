import Link from 'next/link';

export default function PredictionWrapper ({ rawPrediction, rawUser, rawDate, rawTxsHash }) {

    return(
        <>
        <h2>"{(rawPrediction? rawPrediction : 'No prediction')}"</h2>
        <br></br>
        <p>Created by: {(rawUser? rawUser : "No creator")}</p>
        <br></br>
        <p>Created at: {(rawDate? rawDate + " UTC" : "No date")}</p>
        <br></br>
        <p>View hash onchain: {(rawTxsHash? <Link href={"https://explorer.solana.com/tx/" + rawTxsHash + "?cluster=devnet"}>Solana Block Explorer</Link> : "No txs hash")}</p>
        <br></br>
        <button onclick="scrollToSection('section1')">Verify</button>
        <button onclick="scrollToSection('section2')">Share</button>
        </> 
    );
}
