import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {ClientProxy} from "@nestjs/microservices";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
      @Inject('USER_SERVICE') private readonly UserService: ClientProxy,
      private readonly jwtService: JwtService,
  ) {}

  async signIn(signInAuthDto: SignInAuthDto) {
    let responseObservable = this.UserService.send({ cmd: 'user-check'}, {...signInAuthDto});
    const [response] = await Promise.all([responseObservable.toPromise()]);
    if (response === null) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    if (response.status === 'inactive') throw new HttpException('User is inactive', HttpStatus.UNAUTHORIZED);

    const payload = { sub: response.user_id, username: response.email, role: response.role.name };
    const access_token =  await this.jwtService.signAsync(payload)
    return { access_token };
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

  tokenVerify(token: string) {
    try {
      return this.jwtService.verify(token, { secret: '10' });
    }catch (error) {
      return null;
    }
  }
}
