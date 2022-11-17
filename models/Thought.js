const { Schema, model, Types } = require('mongoose');

const dateFunction = require('../utils/dateFunction');



const ReactionSchema = new Schema(
    {
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            maxLength: 280
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
            get: createdAtVal => dateFunction(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }   
);




const ThoughtSchema = new Schema(
    {
       thoughtText: {
        type: String,
        required: true,
        // needs a validator to be between 1-280 characters
        maxLength: 280,
        minLength: 1
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFunction(createdAtVal)
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

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;