var userModel = require('../models/usermodel')
exports.createuser =function(req,res){ 
    res.render('createuser');

    }
exports.createuserpost =function(req,res){
    var fn = req.body.first_name; 
    var ln = req.body.last_name;
    var em =req.body.email; 
    var pa = req.body.password;
    var ci =req.body.city; 
    console.log('adding data to db');
    var data = { 
        "firstname": fn, 
        "lastname": ln,
        "email":em, 
        "password":pa, 
        "city":ci
    } 
    console.log("yahooo"+ fn+ ln +pa +em +ci);
    newuser=data;
    userModel.create(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
        res.redirect('/showusers')
    }); 
}
exports.updateuseremailget =async function(req,res){ 
    console.log("render user ",req.params.email)
    data={'email':req.params.email}
    var collection1
    await userModel.findOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("show user: "+collection); 
        collection1=collection
        res.render('updateuser',{ firstname: collection.firstname ,lastname: collection.lastname, email: collection.email, city:collection.city});
    }); 
    
    
    }
exports.updateuseremailpost =async function(req,res){ 
    var fn = req.body.first_name; 
    var ln = req.body.last_name;
    var em =req.body.email; 
    var pa = req.body.password;
    var ci =req.body.city; 
    var current = req.params.email
    current=current.replace(':', ''); 



console.log('updating data to db of ', current);
var data = { 
    "firstname": fn, 
    "lastname": ln,
    "email":em, 
    "password":pa, 
    "city":ci



} 
console.log("updated data: ",data)
await userModel.findOneAndUpdate({"email": current},data, {useFindAndModify: false},function(err, collection){ 
    if (err) throw err; 
    console.log("User "+fn+" "+ln+" updated Successfully"); 
    res.redirect('/showusers')
}); 

      
}
exports.showusersget =async function(req,res){ 
    const filter = {};
    const all = await userModel.find(filter);
    console.log(all)
    res.render('showusers', {'docs':all });
    }
    exports.endpoint1 = async function(req, res){
        console.log(req.body.email)
        var em =req.body.email; 
        console.log("User needs to be deleted: ",em)
        userModel.findOneAndDelete({"email": em}, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
           });
           res.send({success:true})
       }
       exports.endpoint2 = async function(req, res){
        console.log(req.body.email)
        var em =req.body.email; 
        res.redirect('/updateuser/'+em)
       }
       exports.searchqueryget = async function(req, res){
        console.log("Search Query: ",req.params.query)
        var name =req.params.query; 
        console.log("Searching All Users starting with H letter: ",name)
        
        var query = {'$regex' : name, '$options' : 'i'};
        const all = await userModel.find({"firstname": query})
        console.log("Searched results: ",all)
        res.render('showusers', {'docs':all });
       }