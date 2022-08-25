// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({env: 'cloud1-0g2tfyd1faa9440f'})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()
  db.collection('userInformation')
  .where({
    _openid:OPENID
  })
  .get()
  .then(res=>{
    return {userInfo:res.data}
  })
  .catch(error=>{
    return false
  })
}