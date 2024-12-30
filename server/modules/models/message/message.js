import { Schema, model } from "mongoose";



const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },

}, { timestamps: true })

export const MessageModel = model('Message', messageSchema)