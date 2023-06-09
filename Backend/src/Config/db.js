const mongoose=require("mongoose")
require('dotenv').config()
const Connect=mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

module.exports={Connect}
