import jwt from 'jsonwebtoken'
import { findUserByUuid } from './db'

const auth = async (ctx, next) => {
  const accessToken = ctx.cookies.get('access_token', { signed: true })
  try {
    const payload = jwt.verify(accessToken, process.env.SECRET)
    ctx.user = await findUserByUuid(payload.id)
  } catch (e) {
    console.log(e)
  }
  await next()
}

export default auth
