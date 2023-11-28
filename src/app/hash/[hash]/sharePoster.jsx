"use client"
import React, { useState, useEffect, useRef } from "react";
// import QRCode from 'qrcode';
import QRCode from 'qrcode'

const userTwitterHandle = truncateString("Freddie Raynolds", 18);

function formatDate(inputDate) {

  let dateObject = new Date(inputDate);

  let options = {
   month: 'short',
   day: 'numeric',
   year: 'numeric',
   hour: 'numeric',
   minute: 'numeric',
   hour12: true,
   timeZone: 'UTC'
  };
  
  let formattedDate = dateObject.toLocaleString("en-US", options);
  console.log(formattedDate);
  return formattedDate;

}

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}

export default function SharePoster({ rawDate, rawTxsHash, rawPrediction, rawUser, rawPredictionHash }) {

  const [image, setImage] = useState(null);
  const [qrcode, setQrcode] = useState(null);
  const [url, setUrl] = useState('');
  const canvas = useRef(null);
  const storedText = "Stored on";
  const predictionText = '“' + rawPrediction + '”';
  const attributeText = `Predicted by ${String(rawUser)}`;
  const timestampText = "- " + formatDate(String(rawDate)) + " UTC";
  const verifyText = "VERIFY";
  const line1Text = "The mathematical properties of the public blockchain";
  const line2Text = "guarantee INDISPUTABLE EVIDENCE of the";
  const line3Text = "following:";
  const line4Text = "1. This prediction UNEQUIVOCALLY ORIGINATES";
  const line5Text = "from the account holder specified above";
  const line6Text = "2. It is UTTERLY IMPOSSIBLE to have been tampered";
  const line7Text = "with, altered or edited in any manner since creation";
  const addressText = "Verification address: nostradamus1.xyz/" + String(rawPredictionHash).substring(0, 12);
  const transactionText = "Transaction: " + rawTxsHash;

  useEffect(() => {

    let canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    let context = canvas.getContext('2d');


    QRCode.toCanvas(canvas, window.location.href, function (error) {
      if (error) console.error(error);
    });

    let imageDataUrl = canvas.toDataURL('image/png');

    const background_img = new Image();  
    // background_img.src = "./posterBackground.jpg"; // NOT WORKING, DON'T KNOW WHY
    background_img.src = "https://i.ibb.co/sQxLKSW/Background-New2.jpg";
    background_img.onload = () => setImage(background_img);
    const qr_img = new Image();
    qr_img.src = imageDataUrl;
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

      // Save the current state of the context
      ctx.save();

      // Translate the context to the desired position
      ctx.translate(x, y);
      console.log("henlooooo")
      // Generate a QR code and draw it onto the canvas
      QRCode.toCanvas(ctx, url, function (error) {
      if (error){
        console.error(error)
      } else {
        console.log('success!');
      }
      })
      console.log("can you see me?")
      // Restore the context to its original state
      ctx.restore();
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

  // useEffect(() => {
  //   if (image && canvas.current && url) {
  //     const ctx = canvas.current.getContext("2d");

  //     // Draw the QR code on top of the existing content
  //     QRCode.toCanvas(canvas.current, url, { width: 170, height: 170 }, (error, qrcodeCanvas) => {
  //       if (error) {
  //         console.error('Error generating QR code:', error);
  //       } else {
  //         ctx.drawImage(qrcodeCanvas, 50, 415); // Adjust position based on your layout
  //       }
  //     });
  //   }
  // }, [image, canvas, url]);

  return (
    <div>
      <div>
        <canvas ref={canvas} width={640} height={707} />
      </div>
    </div>
  );
};
