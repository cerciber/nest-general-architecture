import { HttpStatus } from '@nestjs/common';
import { statics } from '@src/common/statics/statics';
import { ErrorResponseDto } from '@src/dtos/error-response.dto';
import { endpointDescribe } from '@test/utils/endpoint-describe';

endpointDescribe(statics.paths.default.subpaths.defaultPut, (endpointIt) => {
  endpointIt<object, object, ErrorResponseDto>({
    input: () => ({}),
    output: () => ({
      statusCode: HttpStatus.NOT_FOUND,
      OutputClass: ErrorResponseDto,
    }),
  });
});
