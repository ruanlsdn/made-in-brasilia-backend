import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

// @Global()
// @Module({
//   providers: [
//     {
//       provide: PrismaService,
//       useFactory: () =>
//         new PrismaClient({
//           log: ['query'],
//         }),
//     },
//   ],
//   exports: [PrismaService],
// })
// export class PrismaModule {}
