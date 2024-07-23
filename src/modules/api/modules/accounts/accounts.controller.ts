import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { statics } from '@src/statics/statics';
import { HttpStatus } from '@nestjs/common';
import { BodyMessageResponseDto } from '@src/dtos/body-message-response.dto';

@ApiTags(statics.paths.accounts.tag)
@Controller(statics.paths.accounts.path)
export class AccountsController {

  @Get(statics.paths.accounts.subpaths.get.path)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: BodyMessageResponseDto,
  })
  getTestSuccess(): BodyMessageResponseDto {
    return {
      status: HttpStatus.OK,
      message: statics.messages.labels.successLabel,
      body: {
        message: statics.messages.custom.test.successMessage,
      },
    };
  }
}
