import { QueryClient } from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { lastBlockJSON, rawBlockJSON } from '../../../test/fixtures';
import { renderTestUI } from "../../../test/render.utils";
import createEmotionCache from "../../theme/createEmotionCache";
import axiosMock from "../../__mocks__/axios";
import { LatestTransactions } from "../LatestTransactions";

describe("Test containers/LatestTransactions.tsx", () => {

  const cache = createEmotionCache();
  const qc = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const render = renderTestUI({ cache, qc });

  test("Should render an error box when network is unaccessible", async () => {
    axiosMock.get.mockRejectedValueOnce(new Error("Network error"));

    render(() => <LatestTransactions count={5} />);

    expect(screen.getByRole("progressbar")).toBeTruthy();

    await waitFor(() => {
      return screen.getByText("Network error");
    });

    expect(screen.getByText("Error").classList).toContain(
      "MuiCardHeader-title"
    );

    expect(
      screen.getByText("Network error").parentElement?.classList
    ).toContain("MuiCardHeader-subheader");
  });

  test("Should render an error box when response is not valid", async () => {
    const { hash, ...rawBlock } = rawBlockJSON;
    axiosMock.get
      .mockResolvedValueOnce({ data: lastBlockJSON })
      .mockResolvedValueOnce({ data: rawBlock });

    render(() => <LatestTransactions count={5} />);

    expect(screen.getByRole("progressbar")).toBeTruthy();

    await waitFor(
      () => {
        return screen.getByText("ResponseValidationError");
      },
      {
        timeout: 10 * 1000,
      }
    );

    expect(screen.getByText("Details (1)")).toBeTruthy();

    expect(
      screen.getByText(
        "Invalid value undefined supplied to : BTCBlock/hash: string"
      )
    ).toBeTruthy();
  });

  test("Should render latest 5 transactions", async () => {
    axiosMock.get
      .mockResolvedValueOnce({
        data: lastBlockJSON,
      })
      .mockResolvedValueOnce({
        data: rawBlockJSON,
      });

    render(() => <LatestTransactions count={5} />);

    expect(screen.getByRole("progressbar")).toBeTruthy();
    await waitFor(
      () => {
        return screen.getAllByText("Total BTC input");
      },
      { timeout: 10 * 1000 }
    );

    // check "add to watchlist" button is present
    expect(screen.getAllByText("Total BTC input").length).toBe(5);
  });
});
