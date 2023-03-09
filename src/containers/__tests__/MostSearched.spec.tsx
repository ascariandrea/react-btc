import { QueryClient } from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { renderTestUI } from "../../../test/render.utils";
import { getLastSearchByTypeKey } from "../../state/queries";
import createEmotionCache from "../../theme/createEmotionCache";
import { MostSearched } from "../MostSearched";

describe("Test containers/MostSearched.tsx", () => {
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

  afterEach(() => {
    localStorage.clear();
  });

  test("Should render an empty list when localStorage is empty", async () => {
    const { unmount } = render(() => <MostSearched type="address" />);

    expect(screen.getByRole("progressbar")).toBeTruthy();

    const noSearches = await waitFor(
      () => {
        return screen.getByText("No searches");
      },
      {
        timeout: 10 * 1000,
      }
    );

    expect(noSearches).toBeTruthy();

    unmount();
  });

  test("Should render an error box when response is not valid", async () => {
    const addressStorage = {
      "hash0": 2,
      "hash1": 3,
    };
    localStorage.setItem(
      getLastSearchByTypeKey("address"),
      JSON.stringify(addressStorage)
    );

    render(() => <MostSearched type="address" />);

    await waitFor(
      () => {
        return screen.getByText("Clear searches");
      },
      {
        timeout: 10 * 1000,
      }
    );

    expect(screen.getByText("hash1 (3)")).toBeTruthy();
    expect(screen.getByText("hash0 (2)")).toBeTruthy();
  });
});
