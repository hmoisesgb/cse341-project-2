const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (rec,res) => { 
    //#swagger.tags=['Welcome']
    res.send('Welcome to the Employee Management API');
});

router.use('/employees', require('./employees'));
router.use('/departments', require('./departments'));

module.exports = router;