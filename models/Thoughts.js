const { Schema, model} = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minLength: 1,
            maxLength: 280
        },
        createdAt : {
            type: Date, 
            default: Date.now
        },
        username: {
            type: String, 
            required: true
        },
        //reactions: [Reactions]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

ReactionSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;