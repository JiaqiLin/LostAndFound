// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud1-0g2tfyd1faa9440f' })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { userInfo } = event
  const{OPENID}=cloud.getWXContext()
  console.log(OPENID)
  let success
  await db.collection('userInformation').add({
    data: {
      _openid:OPENID,
      nickName:userInfo.nickName,
      contact:userInfo.contact,
      avatarUrl:userInfo.avatarUrl
    }
  }).then(res=>{
      success=true
  }).catch(error=>{
      success=false
  })
  return success
}