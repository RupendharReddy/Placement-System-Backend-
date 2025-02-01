const router = require('express').Router();
const {showdata,deletedata}=require("../controllers/testingAPIs")

router.route('/')
    .get(showdata)
    .delete(deletedata)

module.exports=router