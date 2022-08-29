// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud1-0g2tfyd1faa9440f' })
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { userInfo } = event
    const { OPENID } = cloud.getWXContext()
    await db.collection('userInformation')
      .where({ _openid: OPENID })
      .update({
        data: {
          nickName: userInfo.nickName,
          contact: userInfo.contact,
        }
      })
    return { success: true }
  }
  catch (e) {
    return { success: false }
  }
}

