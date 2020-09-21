const express = require('express');
const router = express.Router();
const constants = require('../etc/constants')
const { v4: uuidv4 } = require('uuid');

/**
 * In memory variable which saves all the data during the lifetime of the application.
 */
let items = [
    { id: "1", name: "Made by Eliran Darshan", description: "This program is made for fun!", amount: 1 },
];

/**
 * Get all the information about the iten according to his id.
 * @method [get]
 * @return {[json]} 
 */
router.get('/getItemById/:id',
    async (req, res) => {
        if (req.params.id == 'null') {
            const msg = constants.ID_ERROR.message
            const response = {
                error: true,
                reason: msg
            }
            res.status(200).json(response);
        } else {
            let item = items.find(function (item) {
                return item.id == req.params.id;
            })
            if (item) {
                const response = {
                    id: item.id,
                    name: item.name,
                    amount: item.amount,
                    description: item.description,
                    error: false
                }
                res.status(200).json(response);
            } else {
                const response = {
                    error: true,
                    reason: constants.ITEM_NOT_FOUND.message
                }
                res.status(200).json(response);
            }
        }
    })

/**
 * Get all the items currently in memory.
 * @method [get]
 * @return {[type]}
 */
router.get('/getItems',
    async (req, res) => {
        res.status(200).json(items);
    })

/**
 * Add a new item to the memory
 * @method [post]
 * @return {[json]}
 */
router.post('/addItem',
    async (req, res) => {
        var amntTest = req.body.amount;
        if (!Number.isInteger(amntTest) || amntTest < 0) {
            const msg = constants.AMOUNT_ERROR.message
            const response = {
                error: true,
                reason: msg
            }
            res.status(200).json(response);
        } else {
            const generated_id = uuidv4();
            const new_item = {
                id: generated_id,
                name: req.body.name,
                description: req.body.description,
                amount: req.body.amount
            };
            items.push(new_item);
            res.status(200).json(generated_id)
        }
    })

/**
 * Delete an item from the memory
 * @method [delete]
 * @return {[json]}
 */
router.delete('/deleteItem/:id',
    async (req, res) => {
        let item = items.find(function (item) {
            const id = req.params.id;
            return item.id == id;
        })
        let index_deletion = items.indexOf(item);
        items.splice(index_deletion, 1);
        res.status(200).send(constants.ITEM_DELETE_SUCCESS)
    })

/**
 * Update an item from the memory
 * @method [post]
 * @return {[json]} 
 */
router.post('/updateItem',
    async (req, res) => {
        var amntTest = req.body.amount;
        if (!Number.isInteger(amntTest) || amntTest < 0) {
            const msg = constants.AMOUNT_ERROR.message
            const response = {
                error: true,
                reason: msg
            }
            res.status(200).json(response);
        } else {
            let item = items.find(function (item) {
                const id = req.body.id;
                return item.id == id;
            })
            let updated_item = {
                id: item.id,
                name: req.body.name,
                description: req.body.description,
                amount: req.body.amount
            };
            let index_deletion = items.indexOf(item);
            items.splice(index_deletion, 1, updated_item);
            res.status(200).json(updated_item)
        }
    })

/**
 * Withdraw a given amount from an item.
 * @method [put]
 * @return {[json]}
 */
router.put("/withdrawItem",
    async (req, res) => {
        var amntTest = req.body.amount;
        if (!Number.isInteger(amntTest) || amntTest < 0) {
            const msg = constants.AMOUNT_ERROR.message
            const response = {
                error: true,
                reason: msg
            }
            res.status(200).json(response);
        } else {
            let item = items.find(function (item) {
                const id = req.body.id;
                return item.id == id;
            })
            to_withdraw = req.body.amount;
            if (item.amount < to_withdraw) {
                const msg = constants.NOT_ENOUGH_AMOUNT_ERROR.message + "You need at least more: " + (to_withdraw - item.amount).toString();
                const response = {
                    error: true,
                    reason: msg
                }
                res.status(200).json(response);
            } else {
                updated_amount = item.amount - to_withdraw;
                let updated_item = {
                    id: item.id,
                    name: item.name,
                    description: item._description,
                    amount: updated_amount
                };
                let index_deletion = items.indexOf(item);
                items.splice(index_deletion, 1, updated_item);
                res.status(200).json(updated_amount)
            }
        }
    })

/**
 * Deposit a given amount to an item in memory
 * @method [put]
 * @return {[json]}
 */
router.put("/depositItem",
    async (req, res) => {
        var amntTest = req.body.amount;
        if (!Number.isInteger(amntTest) || amntTest < 0) {
            const msg = constants.AMOUNT_ERROR.message;
            const response = {
                error: true,
                reason: msg
            }
            res.status(200).json(response);
        } else {
            let item = items.find(function (item) {
                const id = req.body.id;
                return item.id == id;
            })
            let updated_amount = req.body.amount + item.amount;
            let updated_item = {
                id: item.id,
                name: item.name,
                description: item.description,
                amount: updated_amount
            };
            let index_deletion = items.indexOf(item);
            items.splice(index_deletion, 1, updated_item);
            res.status(200).json(updated_amount)
        }
    })

module.exports = router;