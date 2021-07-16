import { Context } from 'telegraf'

// 1. Send a message with questions
export function addBasket(ctx: Context) {
  return ctx.replyWithHTML(ctx.i18n.t('addBasket'))
}
// 2. User completes the fields

// 3. This information stores in object
// 4. Compare if there's same basket in db
// 5. /POST new basket object in DB