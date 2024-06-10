import { BodyResponseDto } from '@src/dto/bodyResponse.dto';
import { ErrorResponseDto } from '@src/dto/errorResponse.dto';
import { LaunchErrorResponseDto } from '@src/dto/launchResponse.dto';

export class Logger {
  public static log(
    response: BodyResponseDto | LaunchErrorResponseDto | ErrorResponseDto,
  ) {
    if ('body' in response) {
      console.log('Response:', response);
    } else {
      console.log('Error:', response);
    }
  }
}
