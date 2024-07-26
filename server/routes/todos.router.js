const router = require('express').Router();
const pool = require('../modules/pool');

router.get(`/`, (req, res) =>{
    const sqlText = `SELECT * FROM "todos"
     ORDER BY "id";
    `
    pool.query(sqlText)
    .then((dbResponse) =>{
        res.send(dbResponse.rows)
    }).catch((dbError) =>{
        console.log(`SQL Query error in /todos!`, dbError)
        res.sendStatus(500)
    })
})
router.post(`/`, (req, res) =>{
    const sqlText = `INSERT INTO "todos"
  ("text")
  VALUES 
  ($1);`
  const sqlValues = [req.body.text]
  pool.query(sqlText, sqlValues)
  .then((dbResponse) =>{
    res.sendStatus(201)
  }).catch((dbErr) =>{
    console.log(`SQL Error in POST/todos!`, dbErr)
    res.sendStatus(500)
  })
})

router.patch(`/`, (req, res) => {
  const sqlText = `UPDATE "todos"
	  SET "isComplete" = $1
	  WHERE "id" = $2;`
  let newStatus
  if(req.body.status === `incomplete`){
    newStatus = true
  } else if (req.body.status === `complete`){
    newStatus = false
  }
  const sqlValues = [newStatus, req.body.itemId]
  pool.query(sqlText, sqlValues)
    .then((dbResponse) => {
      res.sendStatus(200)
    }).catch((dbErr) =>{
      console.log(`Uh oh! SQL Error in PATCH/todos!`, dbErr)
      res.sendStatus(500)
    })
})

module.exports = router;
