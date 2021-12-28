import { properMessage } from '@/helpers/properMessage'
import { addWish, findOrCreateBasket } from '@/models'
import { Context } from 'telegraf'
import { Scenes } from '@/helpers/scenes'

export async function setBasketName(ctx: Context) {
  try {
    const basketName = await properMessage(ctx)
    if (typeof basketName === 'string') {
      await findOrCreateBasket(basketName)
      ctx.state.scene = Scenes.blank
      return ctx.replyWithHTML(ctx.i18n.t('basketCreated'))
    }
  } catch (error) {
    console.error(error)
    return ctx.replyWithHTML(ctx.i18n.t('error'))
  }
}

export async function setWish(ctx: Context) {
  const wishName = await properMessage(ctx)
  if (typeof wishName === 'string') {
    await addWish(ctx.state.basket, wishName)
    return ctx.replyWithHTML(ctx.i18n.t('wishCreated'))
  }
}

export default async function handleNaming(ctx: Context) {
  if (ctx.state.scene === Scenes.addBasket) {
    await setBasketName(ctx)
  }
  if (ctx.state.basket && ctx.state.scene === Scenes.addWish) {
    await setWish(ctx)
  }
  if (ctx.state.scene === Scenes.blank) {
    return ctx.replyWithHTML(ctx.i18n.t('noScene'))
  }
}
