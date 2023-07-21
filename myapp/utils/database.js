import mongoose from "mongoose";
let isConnected = false // track the connection 

export const connectTODB = async() => {
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("Alread Connected To MongoDB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName : 'Promptopia',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('Connected To MongoDB');
    } catch (error) {
        console.log("ERROR IN CONNECTING TO MONGODB : ",error);
    }
}
