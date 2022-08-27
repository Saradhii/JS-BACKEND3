const express = require("express")
const cors = require("cors");
const connection = require('./db/db')
const Redirectroute = require("./routes/RedirectRoute");
const Urlroute = require("./routes/UrlRoute");


//app creation
let app = express();

// needed middlewares
app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
  })
);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', Redirectroute)
app.use('/api/url', Urlroute)

//testing
app.get("/test",(req,res)=>{
  res.send("mock 12 working....")
})


// starting the server && checking db connection
const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
    try {
      await connection;
      console.log("Connected to Database Successfully &");
    } catch (err) {
      console.log(err);
    }
    console.log("Backend is working at http://localhost:5000");
});