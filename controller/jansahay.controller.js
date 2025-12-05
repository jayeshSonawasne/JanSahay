const BigFileAIService = require("../groqAIModel/AI.model");

const processor = new BigFileAIService();

const chatWithJanSahay = async (req, res) => {
    try {
        const prompt = req.query.prompt;
        const allChunks = [];

        await processor.processFile({
            filePath: "./public/text files/AiFeed.txt",
            humanPrompt: prompt,
            chunkSize: 50_000,

            onChunkResult: ({ chunk, content }) => {
                allChunks.push({ chunk, content });
            },
        });

        return res.status(200).json({
            status: true,
            data: allChunks
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error...",
            error: error.message
        });
    }
};

module.exports = chatWithJanSahay;
