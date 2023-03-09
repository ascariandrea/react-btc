import { QueryClient } from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { renderTestUI } from "../../../test/render.utils";
import createEmotionCache from "../../theme/createEmotionCache";
import axiosMock from "../../__mocks__/axios";
import { Transaction } from "../Transaction";
import {
  txJSON,
  blockJSON,
} from "../../../test/fixtures";

describe("Test containers/Transaction.tsx", () => {
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

  test("Should render an error box when network is unaccessible", async () => {
    axiosMock.get.mockRejectedValueOnce(new Error("Network error"));

    render(() => <Transaction transaction="fake-tx" />);

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
    const { time, ...address } = txJSON;
    axiosMock.get.mockResolvedValueOnce({ data: address });

    render(() => <Transaction transaction="fake-tx" />);

    expect(screen.getByRole("progressbar")).toBeTruthy();

    await waitFor(() => screen.getByText("ResponseValidationError"));

    expect(screen.getByText("Details (1)")).toBeTruthy();

    expect(
      screen.getByText(
        "Invalid value undefined supplied to : BTCTransaction/time: number"
      )
    ).toBeTruthy();
  });

  test("Should render transaction page correctly", async () => {
    // resolve transaction query
    axiosMock.get.mockResolvedValueOnce({
      data: txJSON,
    });

    render(() => <Transaction transaction="valid-tx" />);

    await waitFor(() => screen.getByRole("progressbar"));

    await waitFor(
      () => {
        screen.debug();
        return screen.getByText(txJSON.hash);
      },
      { timeout: 10 * 1000 }
    );

    const statusText =
      screen.getByText("Status").parentElement?.nextElementSibling?.textContent;

    expect(statusText).toMatch("Confirmed");

    expect(
      screen.getByText("Block height").parentElement?.nextElementSibling
        ?.lastElementChild?.classList
    ).toContain("MuiCircularProgress-root");

    // resolve block query
    axiosMock.mockResponseFor(
      { url: "https://blockchain.info/block-height/779277" },
      { data: blockJSON }
    );

    axiosMock.mockResponseFor(
      {
        url: "https://blockchain.info/q/getblockcount",
      },
      {
        data: 7777777,
      }
    );

    await waitFor(() => screen.getByText("779277"));

    expect(
      screen.getByText("Total Confirmed transactions").parentElement
        ?.nextSibling?.textContent
    ).toBe("6998501");
  });
});
