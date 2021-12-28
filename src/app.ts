import { localeActions } from '@/handlers/language'
// Setup @/ aliases for modules
import 'module-alias/register'
// Config dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
// Dependencies
import { bot } from '@/helpers/bot'
import { ignoreOldMessageUpdates } from '@/middlewares/ignoreOldMessageUpdates'
import { sendHelp } from '@/handlers/sendHelp'
import { i18n, attachI18N } from '@/helpers/i18n'
import { setLanguage, sendLanguage } from '@/handlers/language'
import { addBasket } from '@/handlers/addBasket'
import { addWish } from '@/handlers/addWish'
import { share } from '@/handlers/share'
import { attachUser } from '@/middlewares/attachUser'
import express = require('express')
import end from '@/handlers/end'
import handleNaming from '@/handlers/handleNaming'

// Middlewares
bot.use(ignoreOldMessageUpdates)
bot.use(attachUser)
bot.use(i18n.middleware(), attachI18N)
// Commands
bot.command(['help', 'start'], sendHelp)
bot.command('language', sendLanguage)
bot.command('addBasket', addBasket)
bot.command('addWish', addWish)
bot.command('share', share)
bot.command('end', end)
bot.on('message', handleNaming)
// Actions
bot.action(localeActions, setLanguage)
// Errors
bot.catch(console.error)
// Start bot
bot.launch().then(() => {
  console.info(`Bot ${bot.botInfo.username} is up and running`)
})
// Start server for Heroku
const app = express()
app.use(express.static('public'))
app.get('/', function (req, res) {
  res.send(
    "<h1>Hello There! You found <a href='https://t.me/wishbasket_bot'>@WishBasket_bot</a> backend</h1>"
  )
})
app.listen(process.env.PORT || 3000, () => console.log('Server is running...'))
