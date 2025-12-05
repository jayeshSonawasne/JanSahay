require('dotenv').config();
const fs = require("fs");
const readline = require("readline");
const { ChatGroq } = require("@langchain/groq");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const preFixMsg = require('./systemMessage');

class BigFileAIService {
    constructor() {
        const apiKey = process.env.GROQ_API_KEY;
        // const model = "llama-3.3-70b-versatile";
        const model = "llama-3.1-8b-instant";
        // const model = "openai/gpt-oss-120b";

        if (!apiKey) {
            throw new Error("GROQ_API_KEY is missing in environment variables.");
        }

        // FIXED: must be "apiKey", not "key"
        this.model = new ChatGroq({
            apiKey,
            model
        });
    }

    /**
     * Processes a huge text file in chunks.
     *
     * @param {Object} params
     * @param {String} params.filePath - Path to the text file
     * @param {String} params.humanPrompt - System message (Gov AI style or custom)
     * @param {Number} params.chunkSize - Max chunk size in characters
     * @param {Function} params.onChunkResult - Callback for each processed chunk
     */
    async processFile({
        filePath,
        humanPrompt,
        chunkSize = 50_000,
        onChunkResult = () => {},
    }) {

        if (!filePath) {
            throw new Error("filePath is required");
        }

        // If no systemPrompt provided → use default (prefix)
        const systemMessage = new SystemMessage(preFixMsg);

        // Stream large file safely
        const stream = fs.createReadStream(filePath, { encoding: "utf8" });
        const rl = readline.createInterface({ input: stream });

        let buffer = "";
        let chunkCount = 0;

        try {
            for await (const line of rl) {
                buffer += line + "\n";

                if (buffer.length >= chunkSize) {
                    chunkCount++;

                    const response = await this.model.invoke([
                        systemMessage,
                        new HumanMessage(
                            `${humanPrompt}\n\nHere is the next file chunk:\n\n${buffer}`
                        )
                    ]);

                    await onChunkResult({
                        chunk: chunkCount,
                        content: response.content,
                    });

                    buffer = ""; // RESET buffer
                }
            }

            // Process leftover data
            if (buffer.trim().length > 0) {
                chunkCount++;

                const response = await this.model.invoke([
                    systemMessage,
                    new HumanMessage(
                        `${humanPrompt}\n\nHere is the final file chunk:\n\n${buffer}`
                    )
                ]);

                await onChunkResult({
                    chunk: chunkCount,
                    content: response.content,
                });
            }

        } catch (error) {
            console.error("Error while processing file:", error);
            throw error;
        }

        return {
            totalChunks: chunkCount,
            message: "Completed processing file",
        };
    }
}

module.exports = BigFileAIService;
