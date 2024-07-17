import { z } from 'zod'

export const ProductCreateValidationSchema = z.object({
  image: z
    .string({ required_error: 'Image URL is required.' })
    .url({ message: 'Invalid image URL.' }),
  name: z
    .string({ required_error: 'Name is required.' })
    .trim()
    .min(1, 'Name cannot be empty.'),
  brand: z
    .string({ required_error: 'Brand is required.' })
    .trim()
    .min(1, 'Brand cannot be empty.'),
  availableQuantity: z
    .number({ required_error: 'Available quantity is required.' })
    .int({ message: 'Quantity must be an integer.' })
    .nonnegative({ message: 'Quantity must be non-negative.' }),
  price: z
    .number({ required_error: 'Price is required.' })
    .nonnegative({ message: 'Price must be non-negative.' }),
  rating: z
    .number({ required_error: 'Rating is required.' })
    .min(0, 'Rating must be between 0 and 5.')
    .max(5, 'Rating must be between 0 and 5.'),
  description: z.string().trim().optional(),
})

export const ProductUpdateValidationSchema =
  ProductCreateValidationSchema.partial()

export const ProductsUpdateValidationSchema = z.array(
  z.object({
    _id: z.string(),
    orderQuantity: z.number().int().positive(),
  }),
)
