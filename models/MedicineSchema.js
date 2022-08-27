const { Schema, model} = require("mongoose");

const MedicineSchema = ({
   name:String,
   medicine:String,
   user:String,
});

const Medicine = model("medicines",MedicineSchema);

module.exports = Medicine;