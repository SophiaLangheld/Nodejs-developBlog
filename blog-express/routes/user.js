var express = require('express');
var router = express.Router();
const {login} = require('../controller/user')
const {SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function(req, res, next){
    const {username, password} = req.body
    const result = login(username, password)
    return result.then(data => {
        if (data.username){
            // 设置 session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('登录失败Login failed')
        )
    })
    /*const { username, password } = req.body
    res.json({
        errno: 0,
        data:{
            username,
            password
        }
    })*/
});

/*
router.get('/login-test', (req, res, next) =>{
    if(req.session.username){
        res.json({
            errno:0,
            msg:'Angemeldet'
        })
        return
    }
    res.json({
        errno:-1,
        msg: 'noch angemeldet'
    })
})
*/

/*
router.get('/session-test', (req, res, next) => {
    const session = req.session
    if(session.viewNum == null){
        session.viewNum = 0
    }
    session.viewNum++

    res.json({
        viewNum: session.viewNum
    })
})
*/

module.exports = router;