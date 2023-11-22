"use client"
import React, { useState, useEffect, useRef } from "react";
import QRCode from 'qrcode.react';

const txsHash = "2LyN1obLW7BYw1FWT5dzjHfe9AYtBuiAd5fEwyNEJfWLNJ7D3jFvkYf3AUUxSrqKSDE1qba2hTH2uihT2w83JJLn";
const inputDate = "2023-11-20 15:02:33.075252+00";
const userTwitterHandle = truncateString("Freddie Raynolds", 18);


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

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}



const SharePoster = () => {
  const [image, setImage] = useState(null);
  const [qrcode, setQrcode] = useState(null);
  const [url, setUrl] = useState('');
  const canvas = useRef(null);
  const formattedDate = formatDate(inputDate) + " UTC";
  const storedText = "Stored on";
  const predictionText = '“The tokenomics mechanism behind Luna is fundamentally flawed. It WILL go to zero"';
  const attributeText = `Predicted by ${userTwitterHandle}`;
  const timestampText = "- " + formatDate(inputDate) + " UTC";
  const verifyText = "VERIFY";
  const line1Text = "The mathematical properties of the public blockchain";
  const line2Text = "guarantee INDISPUTABLE EVIDENCE of the";
  const line3Text = "following:";
  const line4Text = "1. This prediction UNEQUIVOCALLY ORIGINATES";
  const line5Text = "from the account holder specified above";
  const line6Text = "2. It is UTTERLY IMPOSSIBLE to have been tampered";
  const line7Text = "with, altered or edited in any manner since creation";
  const addressText = "Verification address: nostradamus1.xyz/" + txsHash.substring(0, 12);
  const transactionText = "Transaction Hash: " + txsHash;

  useEffect(() => {
    const background_img = new Image();
    background_img.src = "https://i.ibb.co/sQxLKSW/Background-New2.jpg";
    background_img.onload = () => setImage(background_img);
    const qr_img = new Image();
    qr_img.src = "https://i.ibb.co/nmTw0Ky/Qrcode-wikipedia.jpg";
    qr_img.onload = () => setQrcode(qr_img);
  }, []);

  useEffect(() => {
    // Get the current page URL
    const currentUrl = window.location.href;
    setUrl(currentUrl);
  }, []);

  useEffect(() => {
    if (image && qrcode && canvas) {
      const ctx = canvas.current.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 640, 707);
      ctx.drawImage(image, 0, 0);
      ctx.drawImage(qrcode, 50, 415, 170, 170);

      const maxWidth = 20;
      const maxLines = 5;
      let newLine = "";
      let currentWidth = 0;
      let lines = [];
      const words = predictionText.split(" ");
      
      for (let i = 0; i < words.length; i++) {

        if((lines.length >= maxLines-1) && (currentWidth > 12)) {
          newLine += "..."
          break
        }
        if (words[i].length + 1 + currentWidth < maxWidth) {
          newLine += " ";
          newLine += words[i];
          currentWidth += words[i].length;
        } else {
          lines.push(newLine);
          currentWidth = words[i].length;
          newLine = words[i];
        }
      }
      lines.push(newLine);
      console.log(lines, lines.length);
      const fontSizes = [65, 54, 52, 50, 48, 43, 38]; // dynamic font sizes
      const buffers = [0, 56, 54, 52, 48, 44, 39]; // dynamic line heights
      const starts= [0, 175, 143, 135, 110, 90, 80]; // dynamic x axis
      const yStarts= [15, 14, 23, 23, 23, 25, 27]; // dynamic y axis
      const fontSize = fontSizes[lines.length];
      const buffer = buffers[lines.length];
      ctx.font = `bold ${fontSize}px 'Times New Roman', serif`;
      ctx.fillStyle = "black";
      ctx.textAlign = "left";
        
      let y = yStarts[lines.length];
      let x = starts[lines.length];
      for (let i=0; i<lines.length; i++) {
        if(i===0) ctx.fillText(lines[i], y, x);
        else ctx.fillText(lines[i], y+32, x);
        x = x + buffer;
      }
    
      ctx.font = `bold 22px 'Times New Roman', serif`;
      ctx.fillText(storedText, 400, 15 + 25);

      ctx.font = `bold 38px 'Times New Roman', serif`;
      ctx.fillText(attributeText, 38, 298 + 25);

      ctx.font = `bold 38px 'Times New Roman', serif`;
      ctx.fillText(timestampText, 38, 350 + 30);

      ctx.font = `bold 40px 'Times New Roman', serif`;
      ctx.fillText(verifyText, 308, 442);

      ctx.font = `bold 15px 'Times New Roman', serif`;
      ctx.fillText(line1Text, 246, 479);

      ctx.font = `bold 15px 'Times New Roman', serif`;
      ctx.fillText(line2Text, 246, 496);

      ctx.font = `bold 15px 'Times New Roman', serif`;
      ctx.fillText(line3Text, 246, 513);

      ctx.font = `bold 15px 'Times New Roman', serif`;
      ctx.fillText(line4Text, 246, 543);

      ctx.font = `bold 15px 'Times New Roman', serif`;
      ctx.fillText(line5Text, 246, 560);

      ctx.font = `bold 15px 'Times New Roman', serif`;
      ctx.fillText(line6Text, 246, 579);

      ctx.font = `bold 15px 'Times New Roman', serif`;
      ctx.fillText(line7Text, 246, 596);

      ctx.font = `bold 22px 'Times New Roman', serif`;
      ctx.fillText(addressText, 45, 645);

      ctx.font = `bold 10px 'Times New Roman', serif`;
      ctx.fillText(transactionText, 25, 682);
    }
  }, [
    image,
    canvas,
    qrcode,
    storedText,
    predictionText,
    addressText,
    verifyText,
    timestampText,
    attributeText,
    transactionText,
    line1Text,
    line2Text,
    line3Text,
    line4Text,
    line5Text,
    line6Text,
    line7Text
  ]);

  return (
    <div>
      <div>
        <canvas ref={canvas} width={640} height={707} />
      </div>
      
    </div>
  );
};

export default SharePoster;
