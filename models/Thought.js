const { Schema, model, Types } = require('mongoose');



const ReactionSchema = new Schema(
    {
        reactionId: {
        type:String,
        default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            //need a validator for a 280 character maximum
        },
        userName: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: to format the timestamp on query
        }
    }    
)




const ThoughtSchema = new Schema(
    {
       thoughtText: {
        type: String,
        required: true,
        // needs a validator to be between 1-280 characters
       },
       createdAt: {
        type: Date,
        default: Date.now
        // get:     
       },
       userName: {
        type: String,
        required: true
       },
       reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);