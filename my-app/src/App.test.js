import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

import { setupStore } from "./stateManagment/store/index";

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  console.log("store", preloadedState);
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

describe("App", () => {
  const scroll = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scroll;
  test("render customer_info component", () => {
    renderWithProviders(<App />);
    const info = screen.getByText("Customer Info");
    expect(info).toBeInTheDocument();
  });

  test("should able to click on Calculte earning points", async () => {
    await renderWithProviders(<App />);
    const info = screen.getByTestId("calculate");
    expect(info).toBeInTheDocument();
    fireEvent.click(info);
    expect(scroll).toBeCalled();
  });

  test("should render months wise card for reward points `January|February|March|April|May|June|August|September`", async () => {
    await renderWithProviders(<App />);
    const info = screen.getByTestId("calculate");
    fireEvent.click(info);
    expect(screen.getByText("January")).toBeInTheDocument();
    expect(screen.getByText("February")).toBeInTheDocument();
    expect(screen.getByText("March")).toBeInTheDocument();
    expect(screen.getByText("April")).toBeInTheDocument();
    expect(screen.getByText("May")).toBeInTheDocument();
    expect(screen.getByText("June")).toBeInTheDocument();
    expect(screen.getByText("August")).toBeInTheDocument();
    expect(screen.getByText("September")).toBeInTheDocument();
  });

  test("should  not render months wise card for reward points if data not available `July|October|Novemeber|December`", async () => {
    await renderWithProviders(<App />);
    const info = screen.getByTestId("calculate");
    fireEvent.click(info);
    expect(screen.queryByText("July")).not.toBeInTheDocument();
    expect(screen.queryByText("October")).not.toBeInTheDocument();
    expect(screen.queryByText("Novemeber")).not.toBeInTheDocument();
    expect(screen.queryByText("December")).not.toBeInTheDocument();
  });

  test("should render total earning points as 36078", async () => {
    await renderWithProviders(<App />);
    const info = screen.getByTestId("calculate");
    fireEvent.click(info);
    expect(screen.getByText("Total Toints: 36078")).toBeInTheDocument();
  });
});
