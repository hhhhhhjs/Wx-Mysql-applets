import koa from 'koa'
import koaRouter from 'koa-router'
import koaCors from '@koa/cors'
import mysql2 from 'mysql2/promise'

// 生成随机字符串
function randomString(length, chars) {
  chars = chars || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

// 入参是一些用户信息
// 返回值是mysql账号信息
async function getAMysql() {
  // 1. 把用户信息存储到我们自己的数据库中
  // 自己用一个单独的数据库存储用户的id&创建时间
  // 使用定时任务，每日检查当前事件和创建事件的差值是否大于一个月
  // 如果大于一个月，删除此纪录
  // 同时删除用户和数据库
  // 记录的信息包括，用户的微信id(通过微信接口获取)，创建时间，数据库信息（dbname,dbuser）

  // 2. 创建mysql用户
  const dbname = randomString(6)
  const dbuser = randomString(6)
  const dbpassword = randomString(12)
  const host = '119.45.134.66'
  const port = '3306'

  const config = { host, port, user: 'root', password: '123456' }
  const conn = await mysql2.createConnection(config);
  // 8.0版本
  // 要允许root用户登录
  await conn.execute(`CREATE DATABASE IF NOT EXISTS ${dbname};`)
  await conn.execute(`CREATE USER '${dbuser}'@'%' IDENTIFIED BY '${dbpassword}';`)
  await conn.execute(`GRANT ALL ON ${dbname}.* TO '${dbuser}'@'%';`)
  await conn.execute(`flush privileges;`)
  return {
    dbname: dbname,
    dbip: host,
    dbport: port,
    username: dbuser,
    password: dbpassword
  }
}

const app = new koa()
const router = new koaRouter()

router.get('/mysql/info', async (ctx) => {
  const result = await getAMysql()
  ctx.body = {
    code: 0,
    data: result
  }
})

app.use(koaCors())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, '0.0.0.0', () => {
  console.log("app is listening on port 3000!")
})