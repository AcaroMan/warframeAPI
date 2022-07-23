'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const common = require('../validations/common');
async function isValidWarframe(warframe) {
    var responseArray = { messages: [] };
    var warframes = await firestore.collection('warframes').get();
    warframes = warframes.docs.map(doc => doc.data());
    if (common.isEmptyString(warframe.name)) {
        responseArray.messages.push({ parameter: "name", message: 'Name is required as a letter string' });
    } else if (warframes.find(warframe => warframe.name === warframe.name)) {
        responseArray.messages.push({ parameter: "name", message: 'Name already exists' });
    }


    if (warframe.systemsAmmount === undefined || warframe.systemsAmmount === null || isNaN(warframe.systemsAmmount)) {
        responseArray.messages.push({ parameter: "systemsAmmount", message: 'Systems ammount is required as a number' });
    } else if (warframe.systemsAmmount < 0) {
        responseArray.messages.push({ parameter: "systemsAmmount", message: 'Systems ammount must be greater than 0' });
    }


    if (warframe.neuropticsAmmount === undefined || warframe.neuropticsAmmount === null || isNaN(warframe.neuropticsAmmount)) {
        responseArray.messages.push({ parameter: "neuropticsAmmount", message: 'Neuroptics ammount is required as a number' });
    } else if (warframe.neuropticsAmmount < 0) {
        responseArray.messages.push({ parameter: "neuropticsAmmount", message: 'Neuroptics ammount must be greater than 0' });
    }


    if (warframe.chasisAmmount === undefined || warframe.nachasisAmmountme === null || isNaN(warframe.chasisAmmount)) {
        responseArray.messages.push({ parameter: "chasisAmmount", message: 'Chasis ammount is required as a number' });
    } else if (warframe.chasisAmmount < 0) {
        responseArray.messages.push({ parameter: "chasisAmmount", message: 'Chasis ammount must be greater than 0' });
    }

    return responseArray;
}

async function stripWarframe(warframe) {
    var strippedWarframe = {};
    strippedWarframe.name = warframe.name;
    strippedWarframe.systemsAmmount = warframe.systemsAmmount;
    strippedWarframe.neuropticsAmmount = warframe.neuropticsAmmount;
    strippedWarframe.chasisAmmount = warframe.chasisAmmount;
    return strippedWarframe;
}

module.exports = {
    isValidWarframe,
    stripWarframe,
}