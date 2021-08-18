const express = require('express');

const router = express.Router();

router.get('/test1',(req,res)=>{
    res.send('Test1');
})

module.exports = router;