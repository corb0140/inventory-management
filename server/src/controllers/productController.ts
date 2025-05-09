import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

/**
 * @description This function retrieves products from the database
 * @param req - The request object
 * @param res - The response object
 * @returns {Promise<void>} - A promise that resolves with no value (i.e., it does not return anything)
 * @throws {Error} - If there is an error retrieving the products, a 500 status code and an error message are returned
 */
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    /**
     * @description req.query is used to get the query parameters from the URL
     * @example /products?search=productName
     * @example req.query.search will return productName
     * @example req.query.search?.toString() will return productName as a string
     * @example req.query.search?.toString() is used to avoid TypeError: Cannot read properties of undefined (reading 'toString')
     */
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      /**
       * @description Prisma uses a special syntax to filter the data
       * @example where: { name: { contains: search } } will return all products that contain the search string in the name
       * @example where: { name: { contains: search } } is equivalent to SQL WHERE name LIKE '%search%'
       */
      where: {
        name: {
          contains: search,
          mode: "insensitive", // Case insensitive search
        },
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

/* POST */
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });

    /**
     * @description The status code 201 indicates that the request has been fulfilled and a new resource has been created
     * @example In this case, the new product has been created
     * @example res.status(201).json(product) will return the newly created product
     * @example res.status(201).json(product) is equivalent to SQL INSERT INTO products (productId, name, price, rating, stockQuantity) VALUES (productId, name, price, rating, stockQuantity)
     * @example res.status(201).json(product) is equivalent to SQL SELECT * FROM products WHERE productId = productId
     * @example res.status(201).json(product) is equivalent to SQL SELECT * FROM products WHERE name = name
     * etc.
     */
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};
