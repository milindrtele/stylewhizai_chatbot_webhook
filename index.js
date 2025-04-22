// const express = require("express");
// const bodyParser = require("body-parser");

import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Webhook endpoint userDetails
app.post("/userDetails", (req, res) => {
  const requestBody = req.body;
  const tag = req.body.fulfillmentInfo.tag;
  const sessionInfo = req.body.sessionInfo || {};
  const parameters = sessionInfo.parameters || {};

  console.log(requestBody);
  //console.log("Webhook triggered with tag:", tag);
  console.log("Received parameters:", parameters);
  //console.log("Received sessionInfo:", sessionInfo);

  // Example: Add some logic based on parameters
  const responseText = `You sent: ${JSON.stringify(parameters)}`;

  //   res.json({
  //     fulfillment_response: {
  //       messages: [
  //         {
  //           text: {
  //             text: [sessionInfo.session],
  //           },
  //         },
  //       ],
  //     },
  //     session_info: {
  //       parameters: {
  //         email: "asdfasdfasdfasdf@gmail.com",
  //         // Optional: Set new or updated parameters here
  //         // e.g. name: "John", age: 30
  //       },
  //     },
  //   });
});

// Webhook endpoint bodyParameters
app.post("/bodyParameters", (req, res) => {
  const tag = req.body.fulfillmentInfo.tag;
  const sessionInfo = req.body.sessionInfo || {};
  const parameters = sessionInfo.parameters || {};

  const requestBody = req.body;
  console.log(requestBody);
  //   console.log("Webhook triggered with tag:", tag);
  //   console.log("Received parameters:", parameters);
  //console.log("Received sessionInfo:", sessionInfo);

  // Example: Add some logic based on parameters
  const responseText = `You sent: ${JSON.stringify(parameters)}`;

  //   res.json({
  //     fulfillment_response: {
  //       messages: [
  //         {
  //           text: {
  //             text: [sessionInfo.session],
  //           },
  //         },
  //       ],
  //     },
  //     session_info: {
  //       parameters: {
  //         email: "asdfasdfasdfasdf@gmail.com",
  //         // Optional: Set new or updated parameters here
  //         // e.g. name: "John", age: 30
  //       },
  //     },
  //   });
});

// Webhook endpoint definingUndertone
app.post("/definingUndertone", (req, res) => {
  const tag = req.body.fulfillmentInfo.tag;
  const sessionInfo = req.body.sessionInfo || {};
  const parameters = sessionInfo.parameters || {};

  const requestBody = req.body;
  console.log(requestBody);
  //   console.log("Webhook triggered with tag:", tag);
  //   console.log("Received parameters:", parameters);
  //console.log("Received sessionInfo:", sessionInfo);

  function detectUndertone(params) {
    const values = [
      params.vein_color,
      params.jewelrypreference,
      params.sunreaction,
      params.clothing_preference,
    ];

    const score = { warm: 0, cool: 0, neutral: 0 };

    values.forEach((val) => {
      if (val && score[val] !== undefined) {
        score[val]++;
      }
    });

    // Determine final undertone
    let max = 0;
    let final = "neutral"; // default
    for (let tone in score) {
      if (score[tone] > max) {
        max = score[tone];
        final = tone;
      }
    }

    return final; // "cool", "warm", or "neutral"
  }

  // Example: Add some logic based on parameters
  const responseText = `You sent: ${JSON.stringify(parameters)}`;

  const undertone = detectUndertone(parameters);

  res.json({
    // fulfillment_response: {
    //   messages: [
    //     {
    //       text: {
    //         text: [undertone],
    //       },
    //     },
    //   ],
    // },
    session_info: {
      parameters: {
        skin_undertone: undertone,
        // Optional: Set new or updated parameters here
        // e.g. name: "John", age: 30
      },
    },
  });
});

app.listen(PORT, () => {
  console.log(`Dialogflow CX webhook listening at http://localhost:${PORT}`);
});
