const app = require("express")()

app.listen(3000,()=>console.log("running"))

app.get("/project",(req,res)=>{
    res.send("node and react native")
})