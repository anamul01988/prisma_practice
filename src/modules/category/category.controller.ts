import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const inserIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.inserIntoDB(req.body);
    res.send({
      success: true,
      message: "Category created!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
export const categoryController = {
  inserIntoDB,
};
