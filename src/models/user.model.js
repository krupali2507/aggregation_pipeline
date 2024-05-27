import mongoose from "mongoose"

const studentSchema = mongoose.Schema(
{
    name: {
        type: String,
        required:true
    },
    isActive:{ type: Boolean, required:true},
    registered:{ type: Date, required: true},
    age:{ type: Number, required: true},
    gender:{type: String, required: true},
    eyeColor:{type: String, required:true},
    favoriteFruit:{type: String},
    company:{type: Object},
    tags:{type: [String]}

},
{timestamps:true})

const Student = mongoose.model("Student",studentSchema)

export default Student

