const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const{ v4: uuidv4 } = require('uuid') ;
const methodOverride = require("method-override");


app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {   
        id : uuidv4(),
        username : "apna college",
        content : " I love Coding ",
    },
    {
        id : uuidv4(),
        username : "Saket",
        content : " Hard Work beats talent if talent fials to work hard ",
    },
    {
        id : uuidv4(),
        username : "Pain",
        content : "Pain are the gatekeeper of destiny , they are there to ask you one single question are you really want to achieve your goals or are you just a talker",
    }
];

app.get("/posts",(req,res) =>{
    res.render("index.ejs",{ posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let { username, content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
   let {id} = req.params;
   let post = posts.find((p) => id === p.id);
   res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.send("patch request working");
});

app.get("/posts/:id/edit",(req,res)=>{
     let {id} = req.params;
     let post = posts.find((p) => id === p.id);
     res.render("edit.ejs",{ post});
});



app.listen(port,()=>{
    console.log(`listening to port ${port} `);
});

