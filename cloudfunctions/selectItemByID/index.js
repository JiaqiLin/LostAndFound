// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({env: 'cloud1-0g2tfyd1faa9440f'})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {_id}=event
  let item=(await db.collection('item').doc(_id).get()).data
  return {
    success:true,
    item
  }
}