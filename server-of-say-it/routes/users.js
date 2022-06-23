const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { validateUser, User } = require('../models/user')

router.post('/create', async (req,res) =>{
    
    const { error } = validateUser(req.body);
    
    if(error) return res.status(400).send(error.details);
    

    try{
        const userName = await User.findOne({name: req.body.name});
        const userEmail = await User.findOne({email: req.body.email});

        const errorObj = [{
            "message": "\"email\" already registered",
            "path": [
                "email"
            ],
        },{
            "message": "\"name\" was taken",
            "path": [
                "name"
            ],
        }];
            

        if(userName && userEmail) return res.status(400).send(errorObj);
        if(userEmail) return res.status(400).send([errorObj[0]]);
        if(userName) return res.status(400).send([errorObj[1]]);


        let user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)

        await user.save();

        res.send(user);

    }catch(err){
        console.log(err);
        res.status(500);
    }

})

module.exports = router;