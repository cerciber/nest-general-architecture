import { HttpStatus } from '@nestjs/common';
import { Path } from '@src/common/statics/paths/paths';
import { getItMessage } from './get-it-message';
import { validateResponse } from './validate-response-structure';
import { statics } from '@src/common/statics/statics';

type SetItConfig<ParamsType, InputType, OutputType> = {
  input: () => {
    data?: InputType;
    token?: string;
    params?: ParamsType;
  };
  output: () => {
    statusCode: HttpStatus;
    OutputClass: any;
  };
  customValidation?: (response: OutputType) => void;
};

type SetItFunction = <ParamsType, InputType, OutputType>({
  input,
  output,
  customValidation,
}: SetItConfig<ParamsType, InputType, OutputType>) => Promise<void>;

export function endpointDescribe(
  path: Path,
  callback: (setIt: SetItFunction) => void,
): void {
  describe(`Operations over ${statics.docs.httpMethods[path.method as keyof typeof statics.docs.httpMethods]} ${path.path}`, () => {
    const setIt: SetItFunction = async <ParamsType, InputType, OutputType>(
      config: SetItConfig<ParamsType, InputType, OutputType>,
    ) => {
      const outputData = config.output();
      it(
        getItMessage(path, outputData.statusCode, outputData.OutputClass),
        async () => {
          const inputData = config.input();
          const response = await validateResponse<
            ParamsType,
            InputType,
            OutputType
          >(
            {
              path,
              params: inputData.params,
              statusCode: outputData.statusCode,
              input: inputData.data,
              token: inputData.token,
            },
            outputData.OutputClass,
          );
          if (config.customValidation) {
            config.customValidation(response as OutputType);
          }
        },
      );
    };
    callback(setIt);
  });
}
