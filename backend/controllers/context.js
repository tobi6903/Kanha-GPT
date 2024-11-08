import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

import { FaissStore } from "@langchain/community/vectorstores/faiss";
import dotenv from "dotenv";
dotenv.config();

const getContext = async (req, res) => {
	const { prompt } = req.body;

	try {
		console.log(prompt);
		// console.log("GOOGLE_API_KEY", process.env.GOOGLE_API_KEY);

		// const embeddings = new GoogleGenerativeAIEmbeddings({
		// 	apiKey: process.env.GOOGLE_API_KEY,
		// 	model: "text-embedding-004", // 768 dimensions
		// 	taskType: TaskType.RETRIEVAL_DOCUMENT,
		// });

		// const directory = "./vector-store";

		// const vectorStore = await FaissStore.load(directory, embeddings);
		// console.log("Hey -1")
		// const data = await vectorStore.similaritySearch(prompt, 100);

		// console.log(data);
	
			// Load embeddings using an API key stored in environment variables
			const embeddings = new GoogleGenerativeAIEmbeddings({
				apiKey: "AIzaSyARGiLtkxvGDYadEJy4VYIrdcjuO4HPn_4",
				model: "text-embedding-004", // Ensure this is the correct model version
				taskType: "RETRIEVAL_DOCUMENT",
			});
	
			// Load the FAISS vector store with embeddings
			const vectorStore = await FaissStore.load("./vector-store", embeddings);
			// Perform a similarity search with a limit on results
			const results = await vectorStore.similaritySearch(prompt, 15);
			// console.log("Minimal search results:", results);
			const formatSearchResults = (results) => {
				return results.map((result, index) => {
				  // Clean up the page content to remove any tabs or excess whitespace
				  const formattedContent = result.pageContent.replace(/\t+/g, ' ').replace(/\n+/g, ' ').trim();
			  
				  return `${formattedContent}`;
				}).join('\n'); // Join each result with a double newline for better readability
			  };
			  let data=formatSearchResults(results)
		res.status(200).json({ prompt: prompt, data: data });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

export { getContext };
