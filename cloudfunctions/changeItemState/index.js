// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud1-0g2tfyd1faa9440f' })
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { _id } = event
    await db.runTransaction(async transaction => {
      const res = await transaction.collection('item').doc(_id).get()
      if (res.data) {
        await transaction.collection('item').doc(_id).update({
          data: {
            state: res.data.state === 1 ? 0 : 1
          }
        })
      } else {
        // 会作为 runTransaction reject 的结果出去
        await transaction.rollback(-100)
      }
    })
    return {
      success: true,
    }
  } catch (e) {
    console.error(`transaction error`, e)
    return {
      success: false,
      error: e
    }
  }
}