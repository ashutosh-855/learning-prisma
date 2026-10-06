import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { LoginDto } from './dto/login.dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async login(loginDto: LoginDto) {
    // 1. Find user
    const user = await this.databaseService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // 2. Compare password
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // JWT next step
    return {
      message: 'Login successful',
      userId: user.id,
      role: user.Role,
    };
  }
}