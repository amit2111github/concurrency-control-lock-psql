var express = require('express');
var router = express.Router();
const {pool} = require("../db");
const path  = require("path");

router.get("/home" , (req , res) => {
  // console.log(__dirname);
  res.sendFile(path.join(`${__dirname}` , "../views/index.html"));
})
router.get('/seats', async function(req, res, next) {
  try {
    console.log("request came");
    const data = await pool.query("select * from seats");
    console.log(data.rows);
    res.json(data.rows);
  }
  catch(e) {
    console.log(e);
    res.json({erro : "failed to get response"});
  }
  
});
router.put("/book/:id/:name" , async (req , res) => {
  try {
    const {name , id} = req.params;
    await pool.query("begin transaction");
    let data = await pool.query("select * from seats where id = $1 and isbooked = 'false' for update"  , [id]);
    // console.log(data);
    if(data.rows.length == 0) {
      return res.json({error : "Failed to Book Seat as it was booked by someone else"});
    }
    data = await pool.query("update seats set isbooked = 'true' , username = $1 where id = $2" , [name , id]);
    await pool.query("commit");
    // await pool.release();
    return res.json({msg : `Seat ${id} booked successfully`});
  }
  catch(err) {
    console.log(err);
  }
});

module.exports = router;
