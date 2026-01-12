import 'dotenv/config';

jest.mock('../generated/prisma/client', () => {
  class PrismaClient {
    $connect = jest.fn();
    $disconnect = jest.fn();
  }

  return { PrismaClient };
});
