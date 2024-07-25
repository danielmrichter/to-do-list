const router = require('express').Router();
const pool = require('../modules/pool');

router.get(`/`, (req, res) =>{
    const sqlText = `SELECT * FROM "todos";
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


module.exports = router;
