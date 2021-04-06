var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/usercontrollers');
router.get('/createuser',user_controller.createuser)

 
    
    router.post('/createuser',user_controller.createuserpost)
    router.get('/updateuser/:email',user_controller.updateuseremailget)
        
        router.post('/updateuser/:email',user_controller.updateuseremailpost)
router.get('/showusers',user_controller.showusersget)
    router.post('/endpoint', user_controller.endpoint1)
        router.post('/endpoint2', user_controller.endpoint2)
           
           router.get('/search/:query', user_controller.searchqueryget)
           module.exports = router;
