const express = require('express');
const router = express.Router();

module.exports = () => {

router.get("/api/users", (req,res)=> {
    res.send('cooriendo')
})
return router;

}



