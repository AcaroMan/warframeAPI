
const express = require('express');
const { addWarframe, getWarframes, incrementWarframeItem } = require('../controllers/warframeController');

const router = express.Router();

router.get('/warframes', getWarframes);
router.post('/warframes', addWarframe);

router.patch('/warframes/:id/:item/increment', incrementWarframeItem);


module.exports = router