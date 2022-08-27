const Patients = require("../models/PatientSchema");
const Router = require("express");


const PatientsRoute = Router();

// add new patient
PatientsRoute.post("/newpatient",(req,res)=>{
    const {name,age,gender,img,medicine}=req.body;
    const todo = new Patients({name,age,gender,img,medicine});
    todo.save().then(()=>{
        res.status(200).send({message:"Patient created successfully"});
    });
})

// get all patients
PatientsRoute.get("/all", async(req,res)=>{
    const patients = await Patients.find();
    res.status(200).send(patients);
});

//filter by male
PatientsRoute.get("/filter/M", async(req,res)=>{
    const patients = await Patients.find({"gender":"M"});
    res.status(200).send(patients);
});

//filter by female
PatientsRoute.get("/filter/F", async(req,res)=>{
    const patients = await Patients.find({"gender":"F"});
    res.status(200).send(patients);
});

//sort by age Low to high
PatientsRoute.get("/sort/L", async(req,res)=>{
    const patients = await Patients.find().sort("age");
    res.status(200).send(patients);
});

//sort by age High to Low
PatientsRoute.get("/sort/H", async(req,res)=>{
    const patients = await Patients.find().sort({"age":-1});
    res.status(200).send(patients);
});

//delete patient
PatientsRoute.delete("/delete/:id", async(req,res)=>{
    const data = await Patients.deleteOne({ _id: req.params.id });
    return res.status(200).send({message: "Patient deleted Succsessfully"});
})

// get patient by name search
PatientsRoute.get("/search", async (req, res) => {
    const { name } = req.query;
    const patient = await Patients.find({ $text: { $search: name } });
    res.status(200).send(patient);
});



module.exports=PatientsRoute;