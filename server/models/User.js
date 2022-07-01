const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            match: [/.+@.+\..+/, 'Must be a valid email address.']
        },
        password: {
            type: String,
            required: true,
            minlength: 4
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

UserSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;