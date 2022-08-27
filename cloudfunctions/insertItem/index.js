// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({env: 'cloud1-0g2tfyd1faa9440f'})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const { item } = event
    const { OPENID } = cloud.getWXContext()
    console.log(item)
    await db.collection('item').add({
      data: {
        _openid: OPENID,
        itemName: item.itemName,
        address: item.address,
        time: item.time,
        date: item.date,
        description: item.description,
        images: item.images,
        releaseTime: formatTime(new Date(Date.now()))
      }
    }).catch(error=>{
      console.log(error)
    })
    return {
      success: true
    }
}
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}