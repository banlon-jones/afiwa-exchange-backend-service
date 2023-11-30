import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import CreateUserDto from '../../dtos/createUser.dto';
import { UserService } from '../../services/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import UpdateUserDto from '../../dtos/updateUser.dto';
import { EntityValidator } from '../../utils/entityValidator';

@ApiTags('users')
@Controller('api/')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly entityValidator: EntityValidator,
  ) {}

  @Get('protected/user/all')
  public async getAllUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }

  @Get('protected/user/:id')
  public async getUserById(@Param('id') id: string): Promise<any> {
    return await this.entityValidator.getUserById(id);
  }

  @Get('protected/user/transactions')
  public async getUserTransactions(@Req() req: any) {
    const currentUser = await this.userService.getCurrentUser(
      req.headers.authorization.replace('Bearer ', ''),
    );
    return this.userService.getUserTransactions(currentUser.email);
  }
  @Post('public/user/signup')
  public createUser(@Body() userDetails: CreateUserDto): any {
    return this.userService.createUser(userDetails);
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
