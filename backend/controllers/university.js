const University = require("../models/University")


exports.addUniversity = async (req,res) => {
    try{
        const {name,email,location} = req.body

        const uni = await University.create({name,email,location})

        res.status(200).json({
            success: true,
            uni
        })
    }catch(err){
        res.status(404).json({
            error: err
        })
    }
}

exports.getAlluniversity = async (req, res) => {
    try{
        const universities = await University.find({});

        res.status(200).json({
            universities
        })
    }catch(err){
        res.status(404).json({
            success: false,
            err
        })
    }
}

exports.getTheUniversity = async (req, res) => {
    try{

        const {search} = req.body

        const university = await University.find({location: search})

        res.status(200).json({
            success:true,
            university
        })

    }catch(err){
        res.status(404).json({
            success:false,
            err
        })
    }
}