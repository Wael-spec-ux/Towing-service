import { Schema } from "mongoose";

const taskSchema =new Schema({
    FirstName:{type:String, required:true},
    LastName:{type:String, required:true},
    EmailAdresse:{type:String, required:true},
    PhoneNumber:{type:Number, required:true},
    CarType:{type:String, required:true},
    ServiceNeeded:{type:String, required:true},
    ProblemType:{type:String, required:true},
    CurrentCarLocation:{type:String, required:true},
    AdditionalInstructions:{type:String}
})
export const taskModel = mongoose.model('Task', taskSchema)