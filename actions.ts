"use server";
import prisma from "./lib/prisma";
import { StringKeyObject } from "./atomconfig";
import "dotenv/config";

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

export async function checkAdminPassword(adminPassword: string) {
  const realAdminPassword = process.env.ADMIN_PWD;
  if (realAdminPassword === adminPassword) {
    return true;
  }
  return false;
}

export async function getOrder(adminPassword: string, tableNumber: string) {
  const realAdminPassword = process.env.ADMIN_PWD;
  if (realAdminPassword !== adminPassword) {
    return [];
  }
  const order = await prisma.order.findMany({
    where: {
      tableNumber,
    },
  });
  const amounts = await prisma.amount.findMany({
    where: {
      orderId: {
        in: order.map((order) => order.id),
      },
    },
  });
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: amounts.map((amount) => amount.productId),
      },
    },
  });
  const result = order.map((order) => ({
    id: order.id,
    tableNumber: order.tableNumber,
    totalPrice: order.totalPrice,
    products,
    amounts,
  }));
  return result;
}

export async function deleteOrder(orderIds: string[]) {
  for (const orderId of orderIds) {
    await prisma.amount.deleteMany({
      where: {
        orderId: orderId,
      },
    });
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }
}
