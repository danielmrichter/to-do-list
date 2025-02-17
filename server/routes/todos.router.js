const router = require('express').Router();
const pool = require('../modules/pool');

router.get(`/`, (req, res) =>{
    const sqlText = `SELECT * FROM "todos"
ORDER BY "id"; `
    pool.query(sqlText)
    .then((dbResponse) =>{
        res.send(dbResponse.rows)
    }).catch((dbError) =>{
        console.log(`SQL Query error in /todos!`, dbError)
        res.sendStatus(500)
    })
})
router.post(`/`, (req, res) =>{
  console.log(`Current date is: `, req.body.date)
    const sqlText = `INSERT INTO "todos"
  ("text", "date")
  VALUES 
  ($1, $2);`
  const sqlValues = [req.body.text, req.body.date]
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
  if(req.body.status === `Incomplete`){
    newStatus = true
  } else if (req.body.status === `Completed!`){
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
router.delete(`/:itemId`, (req, res) =>{
  const sqlText = `DELETE FROM "todos"
	WHERE "id" = $1;`
  const sqlValues = [req.params.itemId]
  pool.query(sqlText, sqlValues)
  .then((dbResponse) =>{
    res.sendStatus(200)
  }).catch((dbErr) => {
    console.log(`Woops. Got a SQL Error in DELETE/todos:`, error)
    res.sendStatus(500)
  })
})
router.put(`/:itemId`, (req, res) =>{
  const sqlText = `UPDATE "todos"
    SET "text" = $1
    WHERE "id" = $2;`
  const sqlValues = [req.body.changedItem, req.params.itemId]
  pool.query(sqlText, sqlValues)
    .then((dbResponse) => {
      res.sendStatus(200)
    }).catch((dbErr) =>{
      console.log(`Your SQL Query in PUT/todos/:itemId is a SQUEEKQL Query! `, dbErr)
      res.sendStatus(500)
    })
})


module.exports = router;
