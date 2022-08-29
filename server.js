 
const express=require("express");
const mongoose= require("mongoose");
const dotenv= require('dotenv');
const cors=require('cors');
const  app=express();
const  app2=express();
const usermodel=require("./schemas/userModel")
const revisemodel=require("./schemas/revisequestionModel")
app.use(express.json());
app.use(cors());
app2.use(express.json());
app2.use(cors());

dotenv.config({path:'./config.env'});
const port=process.env.PORT || 3001;
 
mongoose.connect("mongodb+srv://aman:Akshat1803@cluster0.iii4tad.mongodb.net/main",{
    useNewUrlParser:true,useUnifiedTopology:true
});
app.post("/insert",async(req,res)=>{
    const title=req.body.titlen
    const topic=req.body.topic
    const subtopic=req.body.subtopic
    const article=req.body.article
    const gs=req.body.gs
    const date=req.body.date
    const articleNo=req.body.articleNo
const currentAffair=new usermodel({ title:title,topic:topic,subtopic:subtopic,article:article,gs:gs,articleNo:articleNo,date:date});
try{
await currentAffair.save();
res.send("inserted data");
}
catch(err){
    console.log(err)
}
})
app.get("/read",async(req,res)=>{
    usermodel.find({},(err,result)=>{
        if(err)
        {
            res.send(err);
        }
        res.send(result);
    })
})




app.post("/login",async(req,res)=>{
    const articleno=req.body.articleno
    const question=req.body.question
    const ans=req.body.ans
 
const reviseConcept=new revisemodel({ articleno:articleno,question:question,ans:ans});
try{
await reviseConcept.save();
res.send("inserted data");
}
catch(err){
    console.log(err)
}
})
if(process.env.NODE_ENV =="production"){
    app.use(express.static("client/build"));
}
app.listen(port,()=>{
    console.log("server running on 3001");
}) 

 