import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import z from "zod";

class DeliveriesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string().trim().min(2),
    });

    const { user_id, description } = bodySchema.parse(request.body);

    await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      },
    });

    return response.status(201).json();
  }

  async index(request: Request, response: Response) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return response.json(deliveries);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const delivery = await prisma.delivery.findUnique({
      where: { id },
    });

    return response.json(delivery);
  }
}

export { DeliveriesController };
