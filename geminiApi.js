import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyD9Be9zyRd8c1YG9WwiP6iqVLQLCxdSV5s",
});

async function main() {
  const files = [
    await ai.files.upload({
      file: "./public/images/gettyimages-2202362935-67c4e9bcf1211.jpg",
    }),
  ];

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash-8b",
    contents: {
      role: "user",
      parts: [
        {
          fileData: {
            fileUri: files[0].uri,
            mimeType: files[0].mimeType,
          },
        },
        {
          text: `From the image detect the body type, skin tone and skin undertone. Allowed body types are rectangle, inverted rectangle, pear, apple, hourglass. Allowed skin tones are ebony, dark, tan, olive, fair and light. Allowed undertone are cool, warm, neutral. Give me response in json format with fields bodyType, skinTone, SkinUndertone. String values should be in lower case.`,
        },
      ],
    },
  });
  console.log(response.text);
}

main();
