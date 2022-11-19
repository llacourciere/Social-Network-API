const { User, Thoughts } = require('../models');

const thoughtController = {
    getAllThoughts(req, res){
        Thoughts.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    getThoughtById(){},
    createThought({ params, body }, res){
        Thoughts.create(body)
            .then(({ _id })=> {
            console.log(_id);
            return User.findOneAndUpdate(
                { _id: params.userId},
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this ID' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    updateThought(){},
    deleteThought() {}
}

module.exports = thoughtController;