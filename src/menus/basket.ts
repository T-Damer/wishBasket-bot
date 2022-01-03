import { Menu } from '@grammyjs/menu'
import { WishBasketModel } from '@/models/WishBasket'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

const basketMenu = new Menu<Context>('basketMenu')

const selectBasket = (name: string) => async (ctx: Context) => {
  ctx.dbuser.currentBasket = name
  await ctx.dbuser.save()
}

export async function fetchBaskets(ctx: Context) {
  const baskets = await WishBasketModel.find({ ownerId: ctx.dbuser.id })
  baskets.forEach((basket) =>
    basketMenu.text(basket.name, selectBasket(basket.name))
  )
}

export async function sendBasketMenu(ctx: Context) {
  await fetchBaskets(ctx)
  await ctx.replyWithLocalization('basketMenu', {
    ...sendOptions(ctx),
    reply_markup: basketMenu,
  })
}

export default basketMenu
