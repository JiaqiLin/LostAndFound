# LostAndFound
## 页面
### 主页
1. 关键词搜索
2. 日期搜索
3. 物品简单展示
### 物品详情页
1. 查看详情
2. 点击认领获取联系方式
3. 认领次数增加
### 发布页
1. 填写信息
2. 上传图片
3. 点击发布
### 个人中心
1. 点击跳转修改个人信息页
2. 点击跳转查看我发布的物品页
3. 显示头像和昵称
### 个人中心-修改个人信息
1. 修改昵称
2. 修改联系方式
### 个人中心-查看我发布的物品
1. 查看未认领物品（删除）
2. 查看已认领物品（认领次数、删除、设置已成功认领）
3. 查看已认领成功物品（认领次数、删除、设置未成功认领）
## 数据库
### item 物品集合
|字段名|类型|含义|
|---|---|----|
|_id|string|唯一标识|
|_openid|string|发布者openID|
|itemName|string|物品名|
|address|string|拾取地点|
|date|string|拾取日期|
|time|string|拾取时间|
|desription|string|描述|
|realizeTimes|number|认领次数|
|state|number|状态|
|releaseTime|string|发布时间|
### userInformation 用户信息集合
|字段名|类型|含义|
|---|---|----|
|_id|string|唯一标识|
|_openid|string|用户openID|
|nickName|string|昵称|
|avatarUrl|string|头像url|
|contact|string|联系方式|
## 云函数(函数体统一用async/await，调用统一用promise)
### 对userInformation表操作
#### insertUserInfo
在小程序端获取openid需要调用小程序的login方法获取小程序的登录凭证code,然后使用code向微信换取登录态信息。但通过wx.request 来让code换取openid的url中包含敏感信息小程序密钥secret，因而无法在小程序端直接获取。这里改成插入用户信息，直接云函数端去获取openid。
#### selectUserInfo
根据openid获取用户信息
#### updateUserInfo
根据openid更新用户信息
### 对userInfo表操作
#### addRealizeTimes
使用事务添加认领次数（这里有个小疑问为什么要用事务，inc是原子操作，官方文档中说不会后者覆盖前者操作）
#### changeItemState
改变物品状态，0是未认领/未认领成功，1是认领成功
#### deleteItem
删除物品，包括云存储图片
#### insertItem
插入物品
#### selectItem
1. 根据用户openid和物品状态查询
2. 根据关键字查询
3. 根据拾取日期查询

