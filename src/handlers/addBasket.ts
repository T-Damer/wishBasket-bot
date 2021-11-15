const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
import { Context } from 'telegraf'

// 1. Send a message with questions
export function addBasket(ctx: Context) {
  ctx.state.scene = 'addBasket'
  return ctx.replyWithHTML(ctx.i18n.t('addBasket'))
}
// 2. User completes the fields

// 3. This information stores in object
// 4. Compare if there's same basket in db
// 5. /POST new basket object in DB
