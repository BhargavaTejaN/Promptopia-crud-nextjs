import {connectTODB} from '@utils/database'
import Prompt from "@models/prompt";

export const GET = async(req,res) => {
    try {
        await connectTODB();
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts),{status : 200})
    } catch (error) {
        console.log("ERROR WHILE FETCHING THE POSTS IN BACKEND : ",error)
        return new Response("Failed To Get The Prompts",{status : 500})
    }
}