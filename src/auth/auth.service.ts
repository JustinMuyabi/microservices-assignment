import {Inject, Injectable} from '@nestjs/common';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class AuthService {
  constructor(
      @Inject('USER_SERVICE') private readonly UserService: ClientProxy,
  ) {}

  async signIn(signInAuthDto: SignInAuthDto) {
    let responseObservable = this.UserService.send({ cmd: 'user-check'}, {...signInAuthDto});
    const [response] = await Promise.all([responseObservable.toPromise()]);
    console.log(response)

    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
