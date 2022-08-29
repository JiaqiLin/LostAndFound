// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud1-0g2tfyd1faa9440f' })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { _id } = event
    await db.runTransaction(async transaction => {
      const res1 = await db.collection('item').doc(_id).get()
      let images = res1.data.images
      await db.collection('item').doc(_id).remove()
      await cloud.deleteFile({
        fileList: images
      })
    })
    return {
      success: true
    }
  } catch (e) {
    console.error(`transaction error`, e)
    return {
      success: false,
      error: e
    }
  }
}