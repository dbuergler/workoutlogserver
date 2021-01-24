const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
var sequelize = require('../db');
const Log = sequelize.import('../models/log');


router.post('/', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err}))
});

router.get('/', validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner_id: userid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err}))
});

router.get('/:id', validateSession, (req, res) => {
    let id = req.params.owner_id;

    Log.findAll({
        where: {owner_id: id}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

router.put('/:id', validateSession, (req, res) => {
    const updateLogEntry = {
      description: req.body.log.description,
      definition: req.body.log.definition,
      result: req.body.log.result,
      owner_id: req.user.id,
    };
    const query = { where: { id: req.params.id } };

    Log.update(updateLogEntry, query)
      .then((logs) => res.status(200).json(logs))
      .catch((err) => res.status(500).json({ error: err }));
  });


  router.delete('/:id', validateSession, function(req, res) {
      const query = { where: {id: req.params.id}};

      Log.destroy(query)
      .then(() => res.status(200).json({message: "Log Entry Removed"}))
      .catch((err) => res.status(500).json({ error: err}));
  });

  
module.exports = router;