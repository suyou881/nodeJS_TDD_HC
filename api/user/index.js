//라우팅 설정

const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.get("/", (req, res) => {
    if (req.signedCookies.cookie_login) {
        console.log(req.signedCookies.cookie_login)
        res.render('user_home', {
            cookie: req.signedCookies.cookie_login
        });
    } else {
        console.log("gg");
        res.render('user_home');
    }
});
// router.get('/', ctrl.index);
// router.get('/:id', ctrl.show);
// router.delete('/:id',ctrl.destroy);
// router.post('/',ctrl.create);
// router.put('/:id',ctrl.update);

module.exports=router;