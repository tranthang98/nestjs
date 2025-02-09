import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService
  ) { }

  @Get() // route /=> api (restful)
  @Render("home") //home.ejs
  getHello() {
    //port from .env
    console.log(">> check port = ", this.configService.get<string>("PORT"));

    const message1 = this.appService.getHello();
    
    return {
      message: message1,
    }
    // return this.appService.getHello();
  }

  @Get("abc")
  getHello1(): string {
    return "hello";
  }

}
