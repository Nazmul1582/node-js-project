const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: String,
    username:{
        type: String,
        required: true
    },
    age: Number,
    class: Number,
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: String,
    image: String,
    address: {
        district: String,
        division: String,
        country: {
            type: String,
            default: "Bangladesh"
        } 
    },
    hobbies: [
        {
            name: String,
            position: Number
        }
    ],
    otp : "",
    isDeleted: {
        type: Boolean,
        default: false
    }
});

studentSchema.pre('save', function(next){
    const student = this;
    if(this.isModified('password') || this.isNew()){
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(student.password, salt, function(err, hash){
                if(err){
                    return next(err)
                }
                if(hash){
                    student.password = hash
                }
                next();
            })
        })
    }else{
        next()
    }
})

module.exports = mongoose.model('Student', studentSchema);