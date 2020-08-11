const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { required } = require("@hapi/joi");

    const queriesSchema = new mongoose.Schema({
        name: { type: String,
                required: true
        },
        email: { type: String,
            required: true   
        },
        message: { type: String,
            required: true
        }
    });
    
    
    module.exports = mongoose.model("query", queriesSchema);

