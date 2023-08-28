import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); //instance create korlam
async function main() {
  // const getAllUsers = await prisma.user.findMany();
  // console.log(getAllUsers);
  const postUser = await prisma.user.create({
    data: {
      email: "anamul@gmail.com",
      name: "fahim", //type safety niye khub e concern karon table name column ace prisma te  o thaka lage jodi insert korte cai
      age: 3 //schema te age int boshalam tao error cause prisma client a nai tai , prisma client kintu node modules er moddhe localy boshe ace
    },
  });
  console.log(postUser);
}
main();
