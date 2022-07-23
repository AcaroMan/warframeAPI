
'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const { isValidWarframe, stripWarframe } = require('../validations/warframe-validations');
const Warframe = require('../models/warframe');


const addWarframe = async (req, res, next) => {
    try {
        const data = req.body
        const responseArray = await isValidWarframe(data);
        if (responseArray.messages.length > 0) {
            res.status(422).send({ message: 'Invalid warframe', messages: responseArray.messages });
            return;
        }
        await firestore.collection('warframes').add(data);
        res.send({ message: 'Warframe added successfully', data });
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
}

const getWarframes = async (req, res, next) => {
    try {
        const warframes = await firestore.collection('warframes').get();
        const warframeArray = [];

        warframes.forEach(doc => {
            const warframe = new Warframe(
                doc.data().name,
                doc.data().systemsAmmount,
                doc.data().neuropticsAmmount,
                doc.data().chasisAmmount,
            )
            warframeArray.push(warframe);
        })

        res.send(warframeArray);
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
}

const incrementWarframeItem = async (req, res, next) => {

}

module.exports = {
    addWarframe,
    getWarframes,
    incrementWarframeItem,
}