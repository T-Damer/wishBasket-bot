import { addWishToBasket } from '@/models/WishBasket'
import { fetchBaskets } from '@/menus/basket'
import Context from '@/models/Context'
import basketMenu from '@/menus/basket'
import sendOptions from '@/helpers/sendOptions'

export default async function addWish(ctx: Context) {
  await fetchBaskets(ctx)
  await ctx.replyWithLocalization('basketMenu', {
    ...sendOptions(ctx),
    reply_markup: basketMenu,
  })
  if (ctx.message && ctx.message.text) {
    await addWishToBasket('main', ctx.message.text)
    return ctx.replyWithLocalization('wishCreated', sendOptions(ctx))
  }
  return ctx.replyWithLocalization('provideBasketName', sendOptions(ctx))
}
