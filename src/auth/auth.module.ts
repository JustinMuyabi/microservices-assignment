import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        // options: { host: "::1", port: 4001 } -- normal docker internal to out
        // options: { host: "host.docker.internal", port: 4001 }
        options: { host: "users-service", port: 4001 }
      }
    ]),
      JwtModule.register({secretOrPrivateKey: '10', signOptions: {expiresIn: '10m'}})
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
