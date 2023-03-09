import { QueryClient } from "@tanstack/react-query";
import { renderHook, screen, waitFor } from "@testing-library/react";
import React from "react";
import { queryClientWrapper, renderTestUI } from "../../../test/render.utils";
import { useDoAddToWatchList } from "../../state/mutations";
import createEmotionCache from "../../theme/createEmotionCache";
import { WatchList } from "../WatchList";
import { addressJSON } from '../../../test/fixtures';

describe("Test containers/WatchList.tsx", () => {
  jest.setTimeout(20 * 1000);

  const cache = createEmotionCache();
  const qc = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const render = renderTestUI({ cache, qc });

  test("Should render an empty watch list", async () => {
    render(() => <WatchList type="address" />);

    expect(screen.getByRole("progressbar")).toBeTruthy();

    await waitFor(() => {
      return screen.getByText("No address on watch list");
    });
  });

  test("Should render 2 addresses in the watch list", async () => {
    render(() => <WatchList type="address" />);

    await waitFor(() => screen.getByText("No address on watch list"));

    const { result } = renderHook(() => useDoAddToWatchList(), {
      wrapper: ({ children }) => queryClientWrapper(qc, children),
    });

    result.current.mutate({ type: "address", id: addressJSON.address });


    const addressShort = `${addressJSON.address.substring(0, 6)}`;
    await waitFor(() => screen.getByText(addressShort));

    expect(screen.getByText(addressShort).tagName).toEqual("A");

    result.current.mutate({ type: "address", id: addressJSON.address });

    await waitFor(() => screen.getByText("No address on watch list"));
  });
});
