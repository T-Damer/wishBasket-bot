import { Context } from 'telegraf'

// 1. Send a message with questions
export function addWish(ctx: Context) {
  return ctx.replyWithHTML(ctx.i18n.t('addWish'))
}
