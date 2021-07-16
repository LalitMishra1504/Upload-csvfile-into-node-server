const mongoose=require('mongoose');

const employeeSchema=new mongoose.Schema({
    Firstname:{
        type:String,
        require:true
    },
    Lastname:{
        type:String,
        require:true
    },
    City:{
        type:String,
        require:true
    },
    Salary:{
        type:Number,
        require:true
    }
})

const employee=new mongoose.model('employee',employeeSchema);
module.exports=employee;