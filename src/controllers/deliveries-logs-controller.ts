import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import z from "zod";

class DeliveriesLogsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string().trim().min(2),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }

    if (delivery.status === "processing") {
      throw new AppError("Change status to shipped", 400);
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response.status(201).json();
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({ delivery_id: z.string().uuid() });
    const { delivery_id } = paramsSchema.parse(request.params);

    const isCustomer = request.user?.role === "customer";

    const delivery = await prisma.delivery.findFirst({
      where: {
        id: delivery_id,
        ...(isCustomer ? { userId: request.user!.id } : {}), // <- regra de acesso no WHERE
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        logs: {
          orderBy: { createdAt: "desc" },
          // select: { id: true, description: true, createdAt: true, updatedAt: true }, // opcional
          // take: 50, // opcional: limitar quantidade de logs
        },
      },
    });

    if (!delivery) {
      // Se for customer e não veio nada, tanto faz se não existe ou não é dele.
      // Retorne 404 para não vazar existência.
      throw new AppError("Delivery not found", 404);
    }

    return response.json(delivery);
  }

  async index(request: Request, response: Response) {
    const deliveryLogs = await prisma.deliveryLog.findMany({
      where:
        request.user?.role === "customer"
          ? { delivery: { userId: request.user.id } }
          : {},
      orderBy: { createdAt: "desc" },
      include: {
        delivery: {
          select: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    return response.json(deliveryLogs);
  }
}

export { DeliveriesLogsController };
