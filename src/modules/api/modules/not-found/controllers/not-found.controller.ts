import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { statics } from '@src/common/statics/statics';
import { EndpointConfig } from '@src/common/decorators/enpoint-config.decorator';
import {
  getNotFound,
  getNotFoundConfig,
} from './not-found-controller/get-not-found';
import {
  postNotFound,
  postNotFoundConfig,
} from './not-found-controller/post-not-found';
import {
  patchNotFound,
  patchNotFoundConfig,
} from './not-found-controller/patch-not-found';
import {
  putNotFound,
  putNotFoundConfig,
} from './not-found-controller/put-not-found';
import {
  deleteNotFound,
  deleteNotFoundConfig,
} from './not-found-controller/delete-not-found';

@ApiTags(statics.paths.default.tag)
@Controller()
export class NotFoundController {
  constructor() {}

  @HttpCode(HttpStatus.NOT_FOUND)
  @EndpointConfig(getNotFoundConfig)
  async getNotFound(): Promise<ErrorResponseDto> {
    throw getNotFound();
  }

  @HttpCode(HttpStatus.NOT_FOUND)
  @EndpointConfig(postNotFoundConfig)
  async postNotFound(): Promise<ErrorResponseDto> {
    throw postNotFound();
  }

  @HttpCode(HttpStatus.NOT_FOUND)
  @EndpointConfig(patchNotFoundConfig)
  async patchNotFound(): Promise<ErrorResponseDto> {
    throw patchNotFound();
  }

  @HttpCode(HttpStatus.NOT_FOUND)
  @EndpointConfig(putNotFoundConfig)
  async putNotFound(): Promise<ErrorResponseDto> {
    throw putNotFound();
  }

  @HttpCode(HttpStatus.NOT_FOUND)
  @EndpointConfig(deleteNotFoundConfig)
  async deleteNotFound(): Promise<ErrorResponseDto> {
    throw deleteNotFound();
  }
}
