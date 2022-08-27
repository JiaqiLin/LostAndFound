// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud1-0g2tfyd1faa9440f' })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { type, otherOpenid } = event
  console.log(OPENID)
  let userInfo = (await db.collection('userInformation')
    .where({
      _openid: type === 'self' ? OPENID : otherOpenid
    })
    .get()).data[0]
  return { 
    userInfo,
    success:true
  }
}