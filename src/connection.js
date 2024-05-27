import mongoose from "mongoose"

const connection = async() => {
    try{
        const connectDb = await mongoose.connect("mongodb+srv://krupalirao95:qkS5muGVwchv0LDi@cluster0.wwgg5lq.mongodb.net/VTUBE")
        console.log("connected successfully!")

    }catch(error){
        throw new Error(`Something went wrong while connection to database : ${error.message}`)
    }
}

export default connection