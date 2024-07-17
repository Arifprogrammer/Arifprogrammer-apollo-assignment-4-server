import { Schema, model } from 'mongoose'
import { TProduct } from './product.interface'

const ProductSchema = new Schema<TProduct>({
  image: {
    type: String,
    required: [true, 'Image URL is required.'],
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Product name is required.'],
    validate: {
      validator: (value: string) => value.length > 0,
      message: 'Product name cannot be empty.',
    },
  },
  brand: {
    type: String,
    trim: true,
    required: [true, 'Brand is required.'],
    validate: {
      validator: (value: string) => value.length > 0,
      message: 'Brand cannot be empty.',
    },
  },
  availableQuantity: {
    type: Number,
    required: [true, 'Available quantity is required.'],
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer.',
    },
    min: [0, 'Quantity must be non-negative.'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
    min: [0, 'Price must be non-negative.'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required.'],
    min: [0, 'Rating must be between 0 and 5.'],
    max: [5, 'Rating must be between 0 and 5.'],
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
})

export const Product = model<TProduct>('Product', ProductSchema)
