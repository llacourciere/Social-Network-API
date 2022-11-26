const { Schema, model, Types} = require('mongoose');
const { format } = require('date-fns');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => format(new Date(createdAtVal), 'MM-dd-yyyy')
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
)
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
            default: Date.now,
            get: (createdAtVal) => format(new Date(createdAtVal), 'MM-dd-yyyy')
        },
        username: {
            type: String, 
            required: true,
            ref: 'User'
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

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;