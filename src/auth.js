import jwt from 'jsonwebtoken'
import { findUserByUuid } from './db/user'

const auth = async (ctx, next) => {
  if (ctx.path === '/playground') {
    await next()
    return
  }

  const accessToken = ctx.cookies.get('access_token', { signed: true })
  try {
    const payload = jwt.verify(accessToken, process.env.SECRET)
    ctx.user = await findUserByUuid(payload.id)
    await next()
  } catch (e) {
    ctx.status = 401
  }
}

export default auth
