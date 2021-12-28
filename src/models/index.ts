import * as mongoose from 'mongoose'

mongoose.connect(process.env.MONGO)

export * from './User'
export * from './WishBasket'
