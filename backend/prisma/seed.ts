import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { DATABASE_URL } from 'src/constants';

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@test.com' },
    update: {},
    create: {
      email: 'demo@test.com',
      password,
    },
  });

  console.log('Seeded user:', user.email);

  await prisma.task.deleteMany({ where: { userId: user.id } });

  await prisma.task.createMany({
    data: [
      {
        userId: user.id,
        title: 'Task #1',
        description: 'For pagination',
        completed: false,
      },
      {
        userId: user.id,
        title: 'Task #2',
        description: null,
        completed: false,
      },
      {
        userId: user.id,
        title: 'Task #3',
        description: 'search: meeting',
        completed: false,
      },
      {
        userId: user.id,
        title: 'Task #4',
        description: null,
        completed: true,
      },
      {
        userId: user.id,
        title: 'Task #5',
        description: 'search: home',
        completed: true,
      },
      {
        userId: user.id,
        title: 'Task #6',
        description: null,
        completed: false,
      },
    ],
  });

  console.log('Tasks seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
