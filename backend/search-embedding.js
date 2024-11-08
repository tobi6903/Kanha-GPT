import { FaissStore } from "@langchain/community/vectorstores/faiss";

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

// // const embeddings = new GoogleGenerativeAIEmbeddings({
// // 	apiKey: "AIzaSyARGiLtkxvGDYadEJy4VYIrdcjuO4HPn_4",
// // 	model: "text-embedding-004", // 768 dimensions
// // 	taskType: TaskType.RETRIEVAL_DOCUMENT,
// // });

// // const directory = "./vector-store";
// // const loadedVectorStore = await FaissStore.load(directory, embeddings);

// // const result = await loadedVectorStore.similaritySearch("What is gita?", 100);
// // console.log(JSON.stringify({ prompt: "Hi", data: result }));

// const testMinimalSearch = async () => {
// 	const testPrompt = "what is dharma ? "; // Replace with a simple query
// 	try {
// 		const embeddings = new GoogleGenerativeAIEmbeddings({
// 				apiKey: "AIzaSyARGiLtkxvGDYadEJy4VYIrdcjuO4HPn_4",
// 				model: "text-embedding-004", // 768 dimensions
// 				taskType: TaskType.RETRIEVAL_DOCUMENT,
// 			});

// 		const vectorStore = await FaissStore.load("./vector-store", embeddings);
// 		const results = await vectorStore.similaritySearch(testPrompt, 5); // Limit results for test
// 		console.log("Minimal search results:", results);
// 	} catch (error) {
// 		console.error("Error during minimal similarity search:", error);
// 	}
// };

// testMinimalSearch();

// require('dotenv').config(); // To load environment variables
const testMinimalSearch = async () => {
	const testPrompt = "What is dharma?"; // Simple query
	try {
		// Load embeddings using an API key stored in environment variables
		const embeddings = new GoogleGenerativeAIEmbeddings({
			apiKey: "AIzaSyARGiLtkxvGDYadEJy4VYIrdcjuO4HPn_4",
			model: "text-embedding-004", // Ensure this is the correct model version
			taskType: "RETRIEVAL_DOCUMENT",
		});

		// Load the FAISS vector store with embeddings
		const vectorStore = await FaissStore.load("./vector-store", embeddings);
		// Perform a similarity search with a limit on results
		const results = await vectorStore.similaritySearch(testPrompt, 5);
		// console.log("Minimal search results:", results);
		const formatSearchResults = (results) => {
			return results.map((result, index) => {
			  // Clean up the page content to remove any tabs or excess whitespace
			  const formattedContent = result.pageContent.replace(/\t+/g, ' ').replace(/\n+/g, ' ').trim();
		  
			  return `${formattedContent}`;
			}).join('\n'); // Join each result with a double newline for better readability
		  };
		console.log()
	} catch (error) {
		console.error("Error during minimal similarity search:", error);
	}
	
};

testMinimalSearch();
