import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import CreateUserDto from '../../dtos/createUser.dto';
import { UserService } from '../../services/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import UpdateUserDto from '../../dtos/updateUser.dto';
import { EntityValidator } from '../../utils/entityValidator';
import { AuthGuard } from '../../guards/auth/auth.guard';

@ApiTags('users')
@Controller('api/')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly entityValidator: EntityValidator,
  ) {}

  @Post('public/user/signup')
  public createUser(@Body() userDetails: CreateUserDto): any {
    return this.userService.createUser(userDetails);
  }
  @UseGuards(AuthGuard)
  @Get('protected/user/all')
  public async getAllUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }

  @Get('protected/user/:id')
  public async getUserById(@Param('id') id: string): Promise<any> {
    return await this.entityValidator.getUserById(id);
  }

  @Get('protected/user/')
  public async getUserByEmail(@Req() req: any): Promise<any> {
    return await this.userService.getUserByEmail(req.user.email);
  }
  @Put('protected/user/update/:id')
  public async updateUserProfile(
    @Param() param: any,
    @Body() userDetails: UpdateUserDto,
  ): Promise<any> {
    console.log(param.id);
    return await this.userService.updateUserDetails(userDetails, param.id);
  }
}
