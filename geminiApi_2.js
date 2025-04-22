import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyD9Be9zyRd8c1YG9WwiP6iqVLQLCxdSV5s",
});

export async function getValues(image, type, height) {
  const prompt =
    type === "face"
      ? "From the image detect the skin tone and skin undertone and age, Allowed skin tones are ebony, dark, tan, olive, fair and light. Allowed undertone are cool, warm, neutral, for age try to be more accurate. Give me response in json format with fields age, skinTone, SkinUndertone. String values should be in lower case."
      : `From the image and ${height} detect the body type, chest, waist, bust, shoulder, thighs . Give me response in json format with fields body type, chest, waist, bust, shoulder, thighs.Allowed body types are rectangle, inverted rectangle, pear, apple, hourglass. Body parameters should be in number in centimeters, give me values even if they are not accurate. String values should be in lower case.`;

  const files = [
    await ai.files.upload({
      file: image,
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
          text: prompt,
        },
      ],
    },
  });
  console.log(response.text);
}

getValues("./public/images/image_milind.jpg", "face", 178);
