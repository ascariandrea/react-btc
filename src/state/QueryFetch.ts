import { type AxiosError } from "axios";
import { AppError, toAppError } from "errors/AppError";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import type * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";

/**
 * Helper to validate the output of a lazy (TaskEither) axios request 
 * with the given decode function.
 */
export const queryFetch = <A, I = unknown>(
  te: TE.TaskEither<AxiosError, I>,
  decode: t.Decode<I, A>
): TE.TaskEither<AppError, A> => {
  return pipe(
    te,
    // convert AxiosError to AppError
    TE.mapLeft(toAppError),
    TE.chainEitherK((data) =>
      pipe(
        // decode data
        decode(data),
        // when fails returns a proper AppError with validation failures
        E.mapLeft((e) => {
          // eslint-disable-next-line no-console
          console.log("Failing to decode data", data);
          return new AppError("ResponseValidationError", "", failure(e));
        })
      )
    )
  );
};
