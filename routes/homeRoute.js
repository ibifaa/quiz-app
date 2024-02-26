const router = require('express').Router();
const bodyParser = require("body-parser"); 

router.use(bodyParser.json());

const {getHomePage} = require("../controllers/homeController")

router.get('/', getHomePage);

module.exports = router;