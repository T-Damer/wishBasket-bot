import { findOrCreateBasket } from '@/models/WishBasket'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function addBasket(ctx: Context) {
  if (ctx.match && typeof ctx.match === 'string' && ctx.dbuser) {
    try {
      const basket = await findOrCreateBasket(
        ctx.match,
        ctx.dbuser.id as number
      )
      if (basket) {
        ctx.dbuser.currentBasket = basket.name
        await ctx.dbuser.save()
        return ctx.replyWithLocalization('basketCreated', sendOptions(ctx))
      } else {
        throw new Error('Basket creation error')
      }
    } catch (error) {
      console.error(error)
      return ctx.replyWithLocalization('error', sendOptions(ctx))
    }
  } else {
    return ctx.replyWithLocalization('notProperName', sendOptions(ctx))
  }
}
