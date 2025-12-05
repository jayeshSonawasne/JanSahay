const Scheme = require('../models/scheme.model');
const { ChatGroq } = require("@langchain/groq");
require('dotenv').config();
const extractSchemePrompt = require('../groqAIModel/schemeInsertMessage');

const aiClient = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey: process.env.GROQ_API_KEY
});

async function insertSchemeUsingAI(rawSchemeText) {
    try {
        const prompt = extractSchemePrompt.replace("{{SCHEME_TEXT}}", rawSchemeText);

        const response = await aiClient.invoke([
            { role: "system", content: "Return JSON only. No markdown. No commentary." },
            { role: "user", content: prompt }
        ]);

        let aiText = response.content.trim();

        // --- FIX 1: Remove markdown wrappers ---
        aiText = aiText.replace(/```json/gi, "")
                       .replace(/```/g, "")
                       .trim();

        // --- FIX 2: Extract JSON even if extra text is added ---
        const jsonMatch = aiText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("AI output:", aiText);
            throw new Error("No JSON object found in AI response");
        }

        const jsonString = jsonMatch[0];

        // --- FIX 3: Parse JSON safely ---
        let schemeData = JSON.parse(jsonString);

        // --- Insert into MongoDB ---
        const saved = await Scheme.create(schemeData);

        return {
            success: true,
            message: "Scheme inserted successfully",
            data: saved
        };

    } catch (error) {
        console.error("AI insert error:", error);
        return {
            success: false,
            message: error.message
        };
    }
}

module.exports = insertSchemeUsingAI;
