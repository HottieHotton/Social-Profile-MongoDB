const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique:true,
            required: true,
            trim: true
          },
          email: {
            type: String,
            required: 'Email address is required',
            unique:true,
            trim: true,
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please fill a valid email address']
          },

          thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
            }
          ],
          friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
              addedAt: {
                  type: Date,
                  default: Date.now,
                  get: addedAtVal => dateFormat(addedAtVal)
              }
            }
          ]
        },
        {
          toJSON: {
            virtuals: true,
            getters: true
          },
          id: false
        }
);

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  
  
const User = model('User', UserSchema);
module.exports = User;