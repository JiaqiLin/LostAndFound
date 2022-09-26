/**
 * 批量导入志愿者信息，无需审核
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
var xlsx=require('node-xlsx')
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
 try{
  let {fileID}=event
  //1,通过fileID下载云存储里的excel文件
  const res=await cloud.downloadFile({
    fileID:fileID
  })
  const buffer=res.fileContent
  //存储所有数据
  const allExcelData=[]
  //2,解析excel文件里的数据
  let sheets=xlsx.parse(buffer);
  //3.读取数据
  for(let sheetId in sheets){
    for(let rowId in sheets[sheetId].data){
      let row=sheets[sheetId].data[rowId]
      //excel表头格式错误
      if(rowId==0&&(row[0]!=='time'||row[1]!=='userID'))
      {
        //删除云存储的文件
        await cloud.deleteFile({
          fileList:[fileID]
        })
        //返回错误
        return{
          success:false,
          errMsg: '表格格式有误'
        }
      }
      //excel表头格式正确，按行读取数据
      if(rowId>0&&row){ 
        //对excel格式日期数据进行转换       
        let utcDays = Math.floor(row[0] - 25569);
        let utcValue = utcDays * 86400;
        let dateInfo = new Date(utcValue * 1000);
        //保存数据到数组
        allExcelData.push({
            time:new Date(dateInfo.getFullYear(), dateInfo.getMonth(), dateInfo.getDate()),
            userID:row[1]          
        })
      }
    }
  }
  //添加数据到志愿者表
  await db.collection('volunteers').add({data:allExcelData})
  return {
    success: true
  }   
 }catch(e){
   console.error(e)
   return{
     success:false,
     errMsg: '上传失败'
   }
 }

}