import { WishBasketModel, addWishToBasket } from '@/models/WishBasket'
import { sendBasketMenu } from '@/menus/basket'
import { sendWishMenu } from '@/menus/wish'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function addWish(ctx: Context) {
  if (!ctx.dbuser.currentBasket) {
    return await sendBasketMenu(ctx)
  } else {
    if (ctx.match && typeof ctx.match === 'string') {
      await addWishToBasket(ctx.dbuser, ctx.match)
      return ctx.replyWithLocalization('wishCreated', sendOptions(ctx))
    }
  }
}

export async function sendWishes(ctx: Context) {
  const basket = await WishBasketModel.findOne({
    name: ctx.dbuser.currentBasket,
  })
  if (basket) {
    const formatted = basket.items.join(', ')
    return ctx.reply(formatted)
  } else {
    return 'basket not found'
  }
}

export async function completeWish(ctx: Context) {
  if (!ctx.dbuser.currentBasket) {
    await sendBasketMenu(ctx)
  }
  await sendWishMenu(ctx)
}
