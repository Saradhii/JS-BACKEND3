const Medicine = require("../models/MedicineSchema");

const Router = require("express");

const MedicineRoute = Router();



//Getting single user medicine
MedicineRoute.get("/single/:id", async(req,res)=>{
    const singleusermedicine= await Medicine.find({"user":req.params.id});
    res.send(singleusermedicine);
})

// //update medicine by userid
MedicineRoute.put("/edit/:_id",async (req,res) => {
    const updated = await Medicine.updateOne({"user":req.params},{$set:{"name":req.body.name ,"medicine":req.body.medicine }});
    res.status(200).send(updated);
  }
);

//delete medicine
MedicineRoute.delete("/delete/:id", async(req,res)=>{
    const data = await Medicine.deleteOne({ "user": req.params.id });
    return res.status(200).send({message: "medicine deleted Succsessfully"});
})

module.exports=MedicineRoute;