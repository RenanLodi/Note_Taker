const fs = require("fs");
const router = require("express").Router();
let noteData = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => 
res.json(noteData));

router.post("/notes", (req, res) => {
  req.body.id = uuidv4();
  noteData.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    if (err) throw err;
  });
  res.json(noteData);
});


router.delete("/notes/:id", (req, res) => {
  const deleteID = req.params.id;
  for (let i = 0; i < noteData.length; i++) {
    if (noteData[i].id === deleteID) {
      noteData.splice(i, 1);
    }
  }
  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    if (err) throw err;
  });
  const deleteData = noteData;
  res.json(deleteData);
});

module.exports = router;