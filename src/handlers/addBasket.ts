import { findOrCreateBasket } from '@/models/WishBasket'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function addBasket(ctx: Context) {
  if (ctx.match && typeof ctx.match === 'string' && ctx.dbuser) {
    try {
      const basket = await findOrCreateBasket(ctx.match, ctx.dbuser)
      if (basket) {
        return ctx.replyWithLocalization('basketCreated', sendOptions(ctx))
      }
    } catch (error) {
      console.error(error)
      return ctx.replyWithLocalization('error', sendOptions(ctx))
    }
  } else {
    return ctx.replyWithLocalization('notProperName', sendOptions(ctx))
  }
}
