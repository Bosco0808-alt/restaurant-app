"use server";
import prisma from "./lib/prisma";
import { StringKeyObject } from "./atomconfig";

export async function getTypes() {
  const types = await prisma.type.findMany();
  return types;
}

export async function getProducts(typeId: string) {
  const products = await prisma.product.findMany({
    where: {
      typesId: typeId,
    },
  });
  return products;
}

export async function addOrder(products: string, tableNumber: string) {
  const orderedProducts: StringKeyObject = JSON.parse(products);
  const entries = Object.entries(orderedProducts);

  let totalPrice = 0;

  for (const [productId, amount] of entries) {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
    const addedPrice = Number(product?.price) * amount;
    totalPrice += addedPrice;
  }

  const order = await prisma.order.create({
    data: {
      totalPrice,
      tableNumber,
    },
  });

  await prisma.amount.createMany({
    data: entries.map((entries) => ({
      amount: entries[1],
      productId: entries[0],
      orderId: order.id,
    })),
  });
}
