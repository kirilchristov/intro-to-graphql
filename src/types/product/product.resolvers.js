import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

const newProduct(_, args, ctx) => {
  return Product.create({...args.input, createdBy: ctx.user._id})// We got this from Mongo mondel
}

const updateProduct(_, args) => {
  return Product.findByIdAndUpdate(args.id,args.input, {new: true}) //new: true returns theproject after update
  .lean()
  .exec()
}

const removeProduct(_,args) => {
  return Product.findByIdAndRemove(args.id)
  .lean()
  .exec()
}

const product = (_,args) => {
  return Product.findById(args.id)
  .lean()
  .exec()
}

const products = () => {
  return Product.find({}).exec()
}

export default {
  Query: {
    product,
    products
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    __resolveType(product) {},
    createdBy(product){
      return Product.findById(product.createdBy)
      .lean()
      .exec()
    }
  }
}
