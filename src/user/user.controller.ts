import { Controller, Get } from "@nestjs/common";

@Controller('user')
export class UserController {

    @Get()
    findAll(): string {
        return 'Find All User';
    }

    @Get('/by-id')
    deleteUserById(): string {
        return 'Delete User';
    }
}