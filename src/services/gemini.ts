import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyCFTzunMFB01BbYjN_c1tXzEKsz1mWcObA"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

export const searchRecipes = async (query: string): Promise<any> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an AI expert in Indian cuisine. Generate a **valid JSON response** for an **Indian recipe** with the following structure:

    - The recipe should always be an **authentic Indian dish**.
    - The **recipe name** should be specific and well-known in Indian cuisine.
    - Each **ingredient** should have a:
      - **Unique ID** (starting from 1).
      - **Name** (Commonly used in Indian cooking).
      - **Price** (random value between 100 and 1000 indian ruppes curreny).
      - **quantity** 
    - Ensure the output is **pure JSON**, without extra text, explanation, markdown, or code formatting.
    
    ### **Example JSON Response:**
    {
      "recipeName": "Butter Chicken",
      "ingredients": [
        {
          "id": 1,
          "name": "Chicken",
          "price": 300,
          "quantity": "500grams"
        },
        {
          "id": 2,
          "name": "Tomatoes",
          "price": 80,
          "quantity": "4"
        },
        {
          "id": 3,
          "name": "Cream",
          "price": 100,
          "quantity": "200grams"
        },
        {
          "id": 4,
          "name": "Butter",
          "price": 220,
          "quantity: "500grams"
        },
        {
          "id": 5,
          "name": "Garam Masala",
          "price": 20,
             "quantity: "1"
        },
        {
          "id": 6,
          "name": "Garlic",
          "price": 10,
           "quantity: "50grams"
        }
      ]
    }
    Now generate a **valid JSON recipe** for: **${query}**, following the exact structure above.`;

    const result = await model.generateContent(prompt);
    const response = await result.response; // Properly await response
    const text = await response.text(); // Ensure text extraction is awaited

    console.log("API Response:", text);

    try {
      return JSON.parse(text); // Ensure valid JSON parsing
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      throw new Error("Invalid JSON response from AI model");
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};
