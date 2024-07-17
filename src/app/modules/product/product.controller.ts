/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { TProduct } from './product.interface'
import {
  ProductCreateValidationSchema,
  ProductsUpdateValidationSchema,
  ProductUpdateValidationSchema,
} from './product.validation'
import { productService } from './product.service'

export async function insertProduct(req: Request, res: Response) {
  try {
    const product: TProduct = req.body
    const validateProduct = ProductCreateValidationSchema.parse(product) //* validating by using zod
    const result = await productService.insertProductInDB(validateProduct)

    res.json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const { limit } = req.query

    const result = await productService.getAllProductsFromDB(limit as string)

    res.json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

export async function getSingleProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params

    const result = await productService.getSingleProductFromDB(
      productId as string,
    )

    res.json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params
    const product: TProduct = req.body
    const validateProduct = ProductUpdateValidationSchema.parse(product) //* validating by using zod

    const result = await productService.updateProductInDB(
      productId as string,
      validateProduct,
    )

    res.json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

export async function updateProducts(req: Request, res: Response) {
  try {
    const products: { _id: string; orderQuantity: number }[] = req.body
    const validateProducts = ProductsUpdateValidationSchema.parse(products) //* validating by using zod

    const result = await productService.updateProductsInDB(validateProducts)

    res.json({
      success: true,
      message: 'Products updated successfully!',
      data: result,
    })
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params

    await productService.deleteProductFromDB(productId as string)

    res.json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    })
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}
