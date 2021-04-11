const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const { cards, lists } = require('../store')

const listRouter = express.Router()
const bodyParser = express.json()

listRouter
  .route('/list')
  .get((req, res) => {
    res.json(lists);
  })
  .post(bodyParser, (req, res) => {
    // move implementation logic into here
  })

listRouter
  .route('/list/:id')
  .get((req, res) => {
    const { id } =req.params;
    const list = lists.find(li => li.id == id);

    //make sure we found  list
    if(!list){
        logger.error(`list with id ${id} not found.`);
        return res.status(404).send('List not found')
    }
    res.json(list);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const listIndex = lists.findIndex(li => li.id == id);

    if(listIndex === -1){
        logger.error(`List with id ${id} not found.`);
        return res
            .status(404)
            .send('Not Found');
    }

    lists.splice(listIndex, 1);

    logger.info(`List with id ${id} deleted.`);
    res.status(204).end();
  })

module.exports = listRouter