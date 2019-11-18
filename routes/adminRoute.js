let express = require('express');
let router = express.Router();

router.get('/login', (req, res) => {
    res.render('admin/login')
});


module.exports = router;