import mongoose from "mongoose";
let isConnected = false // track the connection 

export const connectTODB = async() => {
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("Alread Connected To MongoDB");
        return 
    }

    try {
        await mongoose.connect(process.env.MONGO,{
            dbName : 'Promptopia',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
    } catch (error) {
        console.log("ERROR IN CONNECTING TO MONGODB : ",error)
    }
}
