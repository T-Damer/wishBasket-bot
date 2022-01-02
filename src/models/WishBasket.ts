import { Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { User } from '@/models/User'

export class WishBasket {
  @prop({ ref: () => User, required: true, index: true })
  owner!: Ref<User>

  @prop({ required: true, default: 'My first basket' })
  name!: string

  @prop({ required: true, default: ['Wish you to be happy :)'] })
  items!: string[]
}

const WishBasketModel = getModelForClass(WishBasket, {
  schemaOptions: { timestamps: true },
})

export async function findOrCreateBasket(name: string, owner: User) {
  let basket = await WishBasketModel.findOne({ name })
  if (!basket) {
    // Try/catch is used to avoid race conditions
    try {
      basket = await new WishBasketModel({ name, owner }).save()
    } catch (err) {
      basket = await WishBasketModel.findOne({ name })
    }
  }
  return basket
}

export async function addWishToBasket(basketName: string, wishName: string) {
  await WishBasketModel.updateOne(
    { name: basketName },
    { $push: { items: wishName } }
  )
}
