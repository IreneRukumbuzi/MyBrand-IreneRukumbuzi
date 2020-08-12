const Query = require("../models/query");

exports.storeQueries = async (req,res) =>{
    const queries = await Query.find();
    res.send({data: queries});
};

exports.createQuery = async (req, res) =>{
    const query = new Query(req.body);
    await query.save();
    res.send({data: query});
};

