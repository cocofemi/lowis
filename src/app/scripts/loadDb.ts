// import { DataAPIClient } from '@datastax/astra-db-ts';
// import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// import OpenAI from 'openai'

// import "dotenv/config"

// type SimilarityMetric = "cosine" | "euclidean" | "dot_product";

// const {ASTRA_DB_NAMESPACE, ASTRA_DB_COLLECTION, 
//     ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, 
//     OPEN_API_KEY} = process.env

// // const groqClient = new Groq({
// //   apiKey: GROQ_API_KEY, // This is the default and can be omitted
// // });

// const openai = new OpenAI({
//   apiKey: OPEN_API_KEY, // This is the default and can be omitted
// });


// const supportedAccomodation= [
//     'https://www.legislation.gov.uk/uksi/2023/416/2023-10-28'
// ]

// const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
// const db = client.db(ASTRA_DB_API_ENDPOINT, {keyspace: ASTRA_DB_NAMESPACE})


// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 512,
//     chunkOverlap: 100
// })

// const createCollection = async (similarityMetric: SimilarityMetric = "dot_product") => {
//     const res = await db.createCollection(ASTRA_DB_COLLECTION,{
//         vector: {
//             dimension: 1536,
//             metric: similarityMetric
//         }
//     })
//     console.log(res)
// }

// const loadSampleData = async () => {
//    const collection = await db.collection(ASTRA_DB_COLLECTION)
//    for await (const url of supportedAccomodation) {
//     const content  = await scrapePage(url)
//     const chunks = await splitter.splitText(content)
//     for await (const chunk of chunks){
//         const embedding = await openai.embeddings.create({
//             model: 'text-embedding-3-small',
//             input: chunk,
//             encoding_format: 'float'
//         })

//         const vector = embedding.data[0].embedding
//         const res  = await collection.insertOne({
//             $vector: vector,
//             text: chunk
//         })

//         console.log(res)
//     }
//    }
// }

// const scrapePage = async (url:string ) => {
//     const loader = new PuppeteerWebBaseLoader(url, {
//         launchOptions: {
//             headless: true
//         },
//         gotoOptions: {
//             waitUntil: 'domcontentloaded',
//         },
//         evaluate: async (page, browser) => {
//             const result = await page.evaluate(() => document.body.innerHTML)
//             await browser.close() 
//             return result
//         }
//     })

//     return (await loader.scrape())?.replace(/<[^>]*>?/gm, '') ?? ''
// }

// createCollection().then(() => loadSampleData())