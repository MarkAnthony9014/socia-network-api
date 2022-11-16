const { User, Thought } = require('../models');


const userController = {

    //get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get one user by it's __id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        //need to populate two fields that are referenced in User model
        .populate({
            path: 'thoughts',
            select: '-__v'
        },
        {
            path: 'friends',
            select: '-__v'
        })
        .then(dbUserData => {
            //If no user is found, send a 404 error message
            if (!dbUserData) {
                res.status(404).json({ message: 'No pizza found with this id!'});
                return;
            }
            //Otherwise return the data in a JSON object
            res.json(dbUserData);
        })
        //catch any errors
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    //create a new user 
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // put request to update a user by it's __id
    editUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a user
    destroyUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //post request to add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true })
            .then(dbUserData => {
                if (!dbUserData){
                    res.status(404).json({message: "No user found with that id"});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
        },
       

    //delete request to remove a friend a user's friend list

    destroyFriend({ params }, res) {
        User.findOneAndDelete(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with that id"});
                    return;
                }
               res.json(dbUserData) 
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
        
    }
};




module.exports = userController;