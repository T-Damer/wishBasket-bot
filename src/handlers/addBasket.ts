import { findOrCreateBasket } from '@/models/WishBasket'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function addBasket(ctx: Context) {
  if (ctx.message && ctx.message.text && ctx.dbuser) {
    try {
      const basket = await findOrCreateBasket(ctx.message.text, ctx.dbuser)
      if (basket) {
        ctx.basketName = basket.name
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
