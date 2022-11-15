const { Thought, User } = require('../models');


const thoughtController = {
    
    //add get request for all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({ path: 'reactions', select: '-__v'})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    //add get request for a single thought by it's _id
    getSingleThought({ params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v'})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.statis(400).json({ message: 'No thoughts at this id'});
              return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create a new thought 
    createThought({ body }, res) {
        Thought.create(body)
        .then
        (({username, _id}) => {
            return User.findOneAndUpdate(
                { username: username },
                { $push: { thoughts: _id }},
                { new: true,
                  runvalidators: true }
            )
        })
        //should this be dbThoughtData or dbUserData? Went with dbUserData
           .then(dbUserData => {
            if (!dbUserData) {
             res.status(404).json({ message: 'No user found with this id'});
             return
            }
            res.json(dbUserData);
           })
           .catch(err => {
            console.log(err);
            res.status(400).json(err);
           });
    },

    //create a put route to update a thought by it's _id
    editThought({ body, params }, res) {
        Thought.findOneAndUpdate(
           { _id: params.id }, body,
           { new: true,
             runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts at this id'})
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err)
          })
        },


        //delete a thought by it's _id
        destroyThought({ params }, res) {
            Thought.findOneAndDelete({ _id: params.id })
            .then(({ username }) => {return User.findOneAndUpdate(
                { username: username },
                { $pull: { thoughts: params.id}},
                { new: true })
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
              res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
        },
    }




module.exports = thoughtController;