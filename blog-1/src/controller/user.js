const {exec, escape} = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    //先使用假数据
    /*if(username === 'zhangsan' && password === '123'){
        return true
    }
    return false*/
    username = escape(username)
    

    // 生成加密密码
    password = genPassword(password)

    password = escape(password)

    const sql = `
        select username, realname from users where username=${username} and password=${password};
    `
    console.log('sql is', sql)

    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}