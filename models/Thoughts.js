const { Schema, model, Types, trusted} = require('mongoose');
const { compareAsc, format } = require('date-fns');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => format(new Date(createdAtVal), 'MM-dd-yyyy')
        }
    },
    {
        toJSON: {
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

ReactionSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;