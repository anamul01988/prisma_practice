import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cratePost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0; //skip ar limit na dile kintu error ashto jodi postman theke list dekhte jetam ,, tai default 0 dile ar error ashbe nah
  const take = parseInt(limit) || 10;
  //   const result = await prisma.post.findMany({
  //     skip,
  //     take,
  //     include: {
  //         author : true,
  //         category: true
  //     }
  //   })
  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip,
      take,
      include: {
        author: true, //author er data chole ashlo
        category: true, //category er data chole ashlo
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "desc" },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm, //search term jodi title a thake find kore felbe
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const total = await tx.post.count();
    return { data: result, total };
  });
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post | number> => { //aita to database update korbe o ba 1 return korbe tai dewa laglo
  // const result = await prisma.post.update({
  //     where: {
  //         id
  //     },
  //     data: payload
  // })

  const result =
    await prisma.$executeRaw`update posts set title = ${payload.title} where id=${id}`;
  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

const learnAggregateAndGrouping = async () => {
  // const result = await prisma.post.aggregate({
  //     _avg: {
  //         authorId: true,
  //         categoryId: true
  //     },
  //     _count: {
  //         authorId: true
  //     },
  //     _sum: {
  //         authorId: true
  //     }
  // })

  const result = await prisma.post.groupBy({
    by: ["title"],
    _count: {
      title: true,
    },
  });
  return result;
};

export const PostService = {
  cratePost,
  getAllPost,
  updatePost,
  deletePost,
  learnAggregateAndGrouping,
};

/**
 * limit = 5
 * page = 1
 * total = 10
 * take = limit
 * skip = limit * page - limit
 *         = 5 * 1 - 5 = 0
 * 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
 */
