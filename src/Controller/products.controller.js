import { PRODUCTS_DAO } from "../dao/index.js";
import { ProductsRepository } from "../dao/repository/products.repository.js";
import { faker } from "@faker-js/faker";
import { generateUserErrorInfo } from "../services/errors/info.js";
import { CustomErrors } from "../services/errors/customErrors.js";
import { Errors } from "../services/errors/errors.js";
import { LOGGER } from "../dao/index.js";
import { USER_DAO } from "../dao/index.js";
import { UsersRepository } from "../dao/repository/users.repository.js";
import { transport } from "../mailler/nodemailer.js";

const userService = new UsersRepository(USER_DAO);
const productsService = new ProductsRepository(PRODUCTS_DAO);

async function getProducts(req, res) {
  req.logger = LOGGER;
  try {
    const products = await productsService.getProducts(req, res);
    res.json({ status: "Success", products });
  } catch (err) {
    const error = CustomErrors.generateError({
      name: "Products Error",
      message: "Error get products",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    res.json({ status: "error", error });
  }
}

async function getProductById(req, res) {
  req.logger = LOGGER;
  try {
    const { pid } = req.params;
    const product = await productsService.getProductById(pid);
    res.json({ status: "Success", product });
  } catch (err) {
    const error = CustomErrors.generateError({
      name: "Product Error",
      message: "Error get product",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    res.json({ status: "error", error });
  }
}

async function saveProduct(req, res) {
  req.logger = LOGGER;
  try {
    const {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail,
      owner,
    } = req.body;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      const error = CustomErrors.generateError({
        name: "Faltan datos",
        message: "Invalid types",
        cause: generateUserErrorInfo({
          title,
          description,
          code,
          price,
          stock,
          category,
          thumbnail,
        }),
        code: Errors.INCOMPLETE_DATA,
      });
      req.logger.error(
        "Error " + JSON.stringify(error) + " " + new Date().toDateString()
      );
      res.json({ status: "error", error });
    } else {
      const newProduct = {
        title,
        description,
        code,
        price: +price,
        status: true,
        stock: +stock,
        category,
        thumbnail,
        quantity: 1,
        owner: owner,
      };
      const result = await productsService.saveProduct(newProduct);
      res.status(200).json({ status: "Success", result });
    }
  } catch (err) {
    const error = CustomErrors.generateError({
      name: "Products Error",
      message: "Error save product",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    res.json({ status: "error", error });
  }
}

async function modifyProduct(req, res) {
  req.logger = LOGGER;
  try {
    const { pid } = req.params;
    const { title, description, code, price, stock, category, thumbnail } =
      req.body;
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      const error = CustomErrors.generateError({
        name: "Faltan datos",
        message: "Invalid types",
        cause: generateUserErrorInfo({
          title,
          description,
          code,
          price,
          stock,
          category,
          thumbnail,
        }),
        code: Errors.INCOMPLETE_DATA,
      });
      req.logger.error(
        "Error " + JSON.stringify(error) + " " + new Date().toDateString()
      );
      res.json({ status: "error", error });
    } else {
      const updateProduct = {
        title,
        description,
        code,
        price: +price,
        status: true,
        stock: +stock,
        category,
        thumbnail,
      };
      const result = await productsService.modifyProduct(pid, updateProduct);
      res.status(200).json({ status: "Success", result });
    }
  } catch (err) {
    const error = CustomErrors.generateError({
      name: "Products Error",
      message: "Error modify product",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    res.json({ status: "error", error });
  }
}

async function deleteProduct(req, res) {
  req.logger = LOGGER;
  try {
    const { pid } = req.params;
    const product = await productsService.getProductById(pid);
    const user = await userService.getUserByEmail(product.owner);
    if (user.role === "premium") {
      const result = await productsService.deleteProduct(pid);
      await transport.sendMail({
        from: "Product deleted <coder123@gmail.com>",
        to: user.email,
        subject: "User Product Deleted",
        headers: {
          "Expiry-Date": new Date(Date.now() + 3600 * 1000).toUTCString(),
        },
        html: `<h1>Tu producto ha sido eliminado</h1>`,
      });
      res.status(200).json({ status: "Success", result });
    } else {
      const result = await productsService.deleteProduct(pid);
      res.status(200).json({ status: "Success", result });
    }
  } catch (err) {
    const error = CustomErrors.generateError({
      name: "Products Error",
      message: "Error delete product",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    res.json({ status: "error", error });
  }
}

async function modifyStockProduct(req, res) {
  req.logger = LOGGER;
  const { pid } = req.params;
  try {
    const response = await productsService.modifyStockProduct(pid);
    res.json({ status: "Success", response });
  } catch (err) {
    const error = CustomErrors.generateError({
      name: "Products Error",
      message: "Error modify stock product",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    res.json({ status: "error", error });
  }
}

async function createProducts(req, res) {
  req.logger = LOGGER;
  try {
    for (let i = 0; i < 100; i++) {
      const newProductRandom = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: +faker.string.numeric(),
        category: faker.commerce.product(),
        thumbnail: faker.image.url(),
        quantity: 1,
      };
      const response = await productsService.saveProduct(newProductRandom);
    }
    res.json({ status: "Success", message: "All products inserted" });
  } catch (err) {
    const error = CustomErrors.generateError({
      name: "Products Error",
      message: "Error create products",
      cause: err,
      code: Errors.DATABASE_ERROR,
    });
    req.logger.error(
      "Error " + JSON.stringify(error) + " " + new Date().toDateString()
    );
    res.json({ status: "error", error });
  }
}

export {
  getProducts,
  getProductById,
  saveProduct,
  modifyProduct,
  deleteProduct,
  modifyStockProduct,
  createProducts,
};
