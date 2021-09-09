import { PrismaClient } from '@prisma/client';

const isDebugEnabled = process.env.DEBUG;

const prisma = new PrismaClient({
  log: isDebugEnabled === 'true' ? ['query', 'info', 'warn', 'error'] : [],
  errorFormat: 'pretty',
});

export default prisma;
