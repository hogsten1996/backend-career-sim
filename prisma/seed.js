import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  for (let i = 1; i <= 3; i++) {
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        password: `password${i}`,
      },
    });

    for (let j = 1; j <= 3; j++) {
      await prisma.post.create({
        data: {
          title: `Post ${j} by ${user.username}`,
          content: `This is content for post ${j} by ${user.username}`,
          userId: user.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
