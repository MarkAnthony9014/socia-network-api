const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /.+@.+..+/,
        },
        thoughts: [
            {
             type: Schema.Types.ObjectId,
             ref: 'Thought'   
            }
        ],
        friends: [ this ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
);

UserSchema.virtual('friendsCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);


module.exports = User;