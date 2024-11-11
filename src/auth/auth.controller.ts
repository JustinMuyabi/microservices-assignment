import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignInAuthDto} from './dto/sign-in-auth.dto';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {MessagePattern} from "@nestjs/microservices";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  create(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @MessagePattern({ cmd: 'verify-token'})
  async tokenVerify(payload: { token: string }) {
    return await this.authService.tokenVerify(payload.token)
  }
}
