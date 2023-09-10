import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient(); //prisma instace created

const insertIntoDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    // data: data
    data,
  });
  return result;
};

const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });
  if (isExist) {
    const result = await prisma.profile.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }
  const result = await prisma.profile.create({
    data,
  });
  return result;
};

export const UserService = {
  insertIntoDB,
  insertOrUpdateProfile,
};
