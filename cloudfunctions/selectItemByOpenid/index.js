// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud1-0g2tfyd1faa9440f' })
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { type } = event
    const { OPENID } = cloud.getWXContext()
    let res
    switch (type) {
      case 0:
        res = await db.collection('item')
          .where({
            _openid:OPENID,
            state: 0,
            realizeTimes: 0
          })
          .get()
        break;
      case 1:
        res = await db.collection('item')
          .where({
            _openid:OPENID,
            state:0,
            realizeTimes:_.gt(0)
          })
          .get()
        break;
      case 2:
        res = await db.collection('item')
          .where({
            _openid:OPENID,
            state: 1
          })
          .get()
        break;
    }
    let items = res.data
    return {
      success: true,
      items
    }
  }
  catch (e) {
    return {
      success: false
    }
  }
}