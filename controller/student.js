const Student = require('../models/student');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const secreteKey = process.env.SECRETE_KEY

const studentValidator = require('../validator/student');

const register = async(req, res) => {
    try{
        const {error, value} = studentValidator.validate(req.body);
        if(error){
            res.status(400).json({
                message: "Validation error",
                error: error.details[0].message
            })
        }else{
            const student = new Student(req.body);
            const data = await student.save();
            return res.status(201).json({
                message: "Student added successfully",
                data
            });
        }       
    }catch(error){
        res.json({
            error
        })
    }
}

const getAll = async(req, res) => {
    try{
        const student = await Student.find();
        if(student.length){
            res.status(200).json({
                student
            })
        }else{
            res.status(400).json({
                message: "No student found"
            })
        }
    }catch(error){
        res.json({
            error
        })
    }
}

const getById = async( req, res) => {
    try{
        const {id} = req.params;
        const student = await Student.findOne({_id:id});
        if(student){
            res.status(200).json({
                message: "Student info below",
                student
            })
        }else{
            res.status(400).json({
                message : "Student not found"
            })
        }
    }catch(error){
        res.json({
            error
        })
    }
}

const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const student = await Student.findOne({email});
        if(!student){
            res.status(400).json({
                message : "No student found with this email account"
            })
        }else{
            const isValid = await bcrypt.compare(password, student.password);
            if(isValid){
                const data = {
                    username: student.username,
                    email: student.email
                }
                const token = jwt.sign(data, process.env.SECRETE_KEY, {expiresIn: "5d"});
                res.status(200).json({
                    message: "Login successfully",
                    token
                })
            }else{
                res.status(400).json({
                    message : "The password that you've entered is incorrect."
                })
            }
        }
    }catch(error){
        res.json({
            error
        })
    }
}


module.exports = {
    register,
    getAll,
    getById,
    login
}