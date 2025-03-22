import mongoose from "mongoose"

const DrugSchema = mongoose.Schema({
      name:{
            type:String,
            required:[true, "Drug name required, this is a mongo schema error"]
      },
      expiry:{
            type:Date,
            required:[true, "Expiry date required, this is a mongo schema error"]
      },
      quantity:{
            type:Number,
            required:[true, "Quantity required, this is a mongo schema error"]
      },price:{
            type:Number,
            required:[true, "Price required, this is a mongo schema error"]
      }

})

const Drug = mongoose.models.Drug || mongoose.model("Drug", DrugSchema)
export default Drug