const mongoose =  require("mongoose");
const { Schema } = mongoose;
const classSchema = new Schema({
    className : String,
    numericName : String,
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Class", classSchema);