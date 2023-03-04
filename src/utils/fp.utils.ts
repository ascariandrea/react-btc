import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";

export const foldTEorThrow = async <T>(
  te: TE.TaskEither<any, T>
): Promise<T> => {
  return await pipe(
    te,
    TE.fold(
      (e) => async () => await Promise.reject(e),
      (d) => async () => await Promise.resolve(d)
    )
  )();
};
