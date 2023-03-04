import { CircularProgress } from "@mui/material";
import {
  type QueryObserverSuccessResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { type AppError } from "errors/AppError";
import * as React from "react";
import { ErrorBox } from "./ErrorBox";

/**
 * Render {children} when given queries resolve successfully
 */
interface QueriesRendererProps<
  Q extends Record<string, UseQueryResult<any, AppError>>
> {
  loader?: "fullsize" | "default";
  queries: Q;
  debug?: boolean;
  render: (data: {
    [K in keyof Q]: QueryObserverSuccessResult<
      Q[K] extends UseQueryResult<infer A, AppError> ? A : never,
      AppError
    >["data"];
  }) => JSX.Element;
}

const QueriesRenderer = <
  Q extends Record<string, UseQueryResult<any, AppError>>
>({
  queries,
  loader = "default",
  debug = false,
  ...props
}: QueriesRendererProps<Q>): JSX.Element => {
  const initialErrors: Record<string, AppError> = {};
  const { isLoading, isError, data, errors } = Object.entries(queries).reduce(
    (acc, [key, value]) => {
      return {
        isLoading: !acc.isLoading ? value.isLoading : acc.isLoading,
        isError: !acc.isError ? value.isError : acc.isError,
        data:
          value.data !== undefined
            ? {
                ...acc.data,
                [key]: value.data,
              }
            : acc.data,
        errors:
          value.error != null
            ? {
                ...acc.errors,
                [key]: value.error,
              }
            : acc.errors,
      };
    },
    {
      isLoading: false,
      isError: false,
      errors: initialErrors,
      data: {},
    }
  );

  if (isLoading) {
    return <CircularProgress key="loader" />;
  }

  if (isError) {
    return (
      <div>
        {Object.values(errors).map((err, i) => (
          <ErrorBox err={err} key={i} />
        ))}
      </div>
    );
  }

  if (debug) {
    return <div />;
  }

  return props.render(data as any);
};

export default QueriesRenderer;
