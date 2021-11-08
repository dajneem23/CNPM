const express = require('express');
const UserRoute = express();

UserRoute.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,_id} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,_id}});
});