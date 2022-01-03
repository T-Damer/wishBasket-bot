import { Menu } from '@grammyjs/menu'
import { WishBasketModel } from '@/models/WishBasket'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export async function fetchWishesFromBasket(ctx: Context) {
  const basket = await WishBasketModel.findOne({
    owner: ctx.dbuser,
    title: ctx.dbuser.currentBasket,
  })
  if (basket) {
    basket.items.forEach((wish) =>
      wishMenu.text(
        wish.completed ? `🔴 ${wish.title} \n` : `⭕️ ${wish.title} \n`
      )
    )
  }
}

export async function sendWishMenu(ctx: Context) {
  await fetchWishesFromBasket(ctx)
  await ctx.replyWithLocalization('basketMenu', {
    ...sendOptions(ctx),
    reply_markup: wishMenu,
  })
}

const wishMenu = new Menu<Context>('basketMenu')

export default wishMenu
