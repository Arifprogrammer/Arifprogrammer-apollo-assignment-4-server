import { ObjectId } from 'mongodb'
import { TProduct } from './product.interface'
import { Product } from './product.model'

async function insertProductInDB(product: TProduct) {
  return await Product.create(product)
}

async function getAllProductsFromDB(limit: string) {
  if (!limit) return await Product.find().sort({ createdAt: -1 })

  const result = await Product.find()
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))

  if (result.length) {
    return result
  }

  throw new Error(`Product not matching with the search term`)
}

async function getSingleProductFromDB(productId: string) {
  const result = await Product.findById({
    _id: new ObjectId(productId),
  })

  if (result) {
    return result
  }

  throw new Error('Product not found')
}

async function updateProductInDB(
  productId: string,
  product: Partial<TProduct>,
) {
  const result = await Product.findOneAndUpdate(
    {
      _id: new ObjectId(productId),
    },
    {
      ...product,
    },
    //* { new: true } will return updated document
    {
      new: true,
    },
  )

  if (result) {
    return result
  }

  throw new Error('Product is not updated please check the product Id again')
}

async function updateProductsInDB(
  products: { _id: string; orderQuantity: number }[],
) {
  const bulkOps = products.map(product => ({
    updateOne: {
      filter: { _id: product._id },
      update: { $inc: { availableQuantity: -product.orderQuantity } },
    },
  }))

  const result = await Product.bulkWrite(bulkOps)

  if (result?.modifiedCount) {
    return result
  }

  throw new Error('Products are not updated.')
}

async function deleteProductFromDB(productId: string) {
  const result = await Product.deleteOne({
    _id: new ObjectId(productId),
  })

  if (result.deletedCount) {
    return result
  }

  throw new Error('Product is not deleted please check the product Id again')
}

export const productService = {
  insertProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  updateProductsInDB,
  deleteProductFromDB,
}
