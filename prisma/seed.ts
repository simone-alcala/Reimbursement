import prisma from './../src/config/database.js';

async function main() {
  await prisma.department.upsert({
    where: {
      description: "PADRAO"
    },
    update: {},
    create: {
      description: "PADRAO"
    }
  })
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})