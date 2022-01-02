import { addWishToBasket } from '@/models/WishBasket'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function addWish(ctx: Context) {
  if (ctx.message && ctx.message.text && ctx.basketName) {
    await addWishToBasket(ctx.basketName, ctx.message.text)
    return ctx.replyWithLocalization('wishCreated', sendOptions(ctx))
  }
  return ctx.replyWithLocalization('provideBasketName', sendOptions(ctx))
}
