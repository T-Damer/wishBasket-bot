import { Menu } from '@grammyjs/menu'
import { WishBasketModel } from '@/models/WishBasket'
import Context from '@/models/Context'

const selectBasket = (name: string) => async (ctx: Context) => {
  await console.log(name)
  ctx.basketName = name
}

export async function fetchBaskets(ctx: Context) {
  const baskets = await WishBasketModel.find({ owner: ctx.dbuser })
  baskets.forEach(({ name }) => basketMenu.text(name, selectBasket(name)))
}

const basketMenu = new Menu<Context>('basketMenu')

export default basketMenu
