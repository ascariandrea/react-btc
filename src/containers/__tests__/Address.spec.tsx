import { QueryClient } from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { addressJSON } from '../../../test/fixtures';
import { renderTestUI } from "../../../test/render.utils";
import createEmotionCache from "../../theme/createEmotionCache";
import axiosMock from "../../__mocks__/axios";
import { Address } from "../Address";

describe("Test containers/Address.tsx", () => {
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

    render(() => <Address address="fake-address" />);

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
    const { hash160, ...address } = addressJSON;
    axiosMock.get.mockResolvedValueOnce({ data: address });

    render(() => <Address address="fake-address" />);

    expect(screen.getByRole("progressbar")).toBeTruthy();

    await waitFor(() => screen.getByText("ResponseValidationError"));

    expect(screen.getByText("Details (2)")).toBeTruthy();

    expect(
      screen.getByText(
        "Invalid value undefined supplied to : BTCAddress/hash160: (null | string)/0: null"
      )
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Invalid value undefined supplied to : BTCAddress/hash160: (null | string)/1: string"
      )
    ).toBeTruthy();
  });

  test("Should render address info page", async () => {
    const address = "valid-address";

    axiosMock.get.mockResolvedValueOnce({
      data: addressJSON,
    });

    render(() => <Address address={address} />);

    expect(screen.getByRole("progressbar")).toBeTruthy();
    await waitFor(
      () => {
        return screen.getByText("Add to watchlist");
      },
      { timeout: 10 * 1000 }
    );

    // check "add to watchlist" button is present
    expect(screen.getAllByText("Add to watchlist").length).toBe(1);

    // check address infos are present in the UI
    const totalSpentValue =
      screen.getByText("Total spent").parentElement?.nextElementSibling
        ?.textContent;
    expect(totalSpentValue).toMatch(`0.03187852 BTC`);

    expect(
      screen.getByText("Total Transactions").parentElement?.nextElementSibling
        ?.textContent
    ).toMatch("2");
  });

  test("Should re-render address info page when adding it to the watch list", async () => {
    const address = "valid-address";

    axiosMock.get.mockResolvedValueOnce({
      data: addressJSON,
    });

    render(() => <Address address={address} />);

    const addToWatchlistButton = await waitFor(() =>
      screen.getByText("Add to watchlist")
    );

    await userEvent.click(addToWatchlistButton);

    await waitFor(() => {
      return screen.getByText("Remove from watchlist");
    }, {
      timeout: 10 * 1000
    });
    expect(screen.getAllByText("Remove from watchlist").length).toBe(1);
  });
});
