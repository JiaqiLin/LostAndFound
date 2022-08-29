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
    case 'selectItemBySearchKey':
      return selectItemBySearchKey(event, context)
    case 'selectItemByDate':
      return selectItemByDate(event, context)
  }



}
async function selectAll(event, context) {
  try {
    const wxContext = cloud.getWXContext()
    let res = await db.collection('item').where({ state: 0 }).get()
    let items = res.data
    return {
      items,
      success: true
    }
  }
  catch (e) {
    console.log(e)
    return {
      success: false
    }
  }
}
async function selectItemByID(event, context) {
  try {
    const { _id } = event
    let res = await db.collection('item').doc(_id).get()
    let item = res.data
    return {
      success: true,
      item
    }
  }
  catch (e) {
    return {
      success: false
    }
  }
}
async function selectItemByOpenid(event, context) {
  try {
    const { state } = event
    const { OPENID } = cloud.getWXContext()
    let res
    switch (state) {
      case 0:
        res = await db.collection('item')
          .where({
            _openid: OPENID,
            state: 0,
            realizeTimes: 0
          })
          .get()
        break;
      case 1:
        res = await db.collection('item')
          .where({
            _openid: OPENID,
            state: 0,
            realizeTimes: _.gt(0)
          })
          .get()
        break;
      case 2:
        res = await db.collection('item')
          .where({
            _openid: OPENID,
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
async function selectItemBySearchKey(event, context) {
  try {
    const { searchKey } = event
    let res
    if (searchKey === '') {
      res = await db.collection('item').where({ state: 0 }).get()
    }
    else {
      res = await db.collection('item')
        .where(_.or([
          {
            itemName: db.RegExp({
              regexp: searchKey,
              options: 'i',
            })
          },
          {
            address: db.RegExp({
              regexp: searchKey,
              options: 'i',
            })
          },
          {
            description: db.RegExp({
              regexp: searchKey,
              options: 'i',
            })
          }]).and([{ state: 0 }]))
        .get()
    }
    let items = res.data
    return {
      success: true,
      items
    }
  }
  catch (e) {
    return {
      success: false,
    }
  }
}
async function selectItemByDate(event, context) {
  try {
    const { date } = event
    let res = await db.collection('item')
      .where(_.and([{ state: 0 },{date:date}]))
      .get()
    let items = res.data
    return {
      items,
      success: true
    }
  }
  catch (e) {
    return {
      success: false
    }
  }
}

