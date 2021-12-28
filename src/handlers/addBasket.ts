import { Context } from 'telegraf'

export function addBasket(ctx: Context) {
  ctx.state.scene = 'addBasket'
  return ctx.replyWithHTML(ctx.i18n.t('addBasket'))
}
