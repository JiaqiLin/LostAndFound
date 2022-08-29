// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud1-0g2tfyd1faa9440f' })
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const { type } = event
  switch (type) {
    case 'selectAll':
      return selectAll(event, context)
    case 'selectItemByID':
      return selectItemByID(event, context)
    case 'selectItemByOpenid':
      return selectItemByOpenid(event, context)
  }
}
