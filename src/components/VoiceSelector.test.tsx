import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store/configureStore";
import VoiceSelector from "./VoiceSelector";
import "isomorphic-fetch";

jest.mock("next/router", () => require("next-router-mock"));

const renderComponent = () => {
  render(
    <Provider store={store}>
      <VoiceSelector />
    </Provider>
  );
};

test("it renders the component", async () => {
  renderComponent();

  const button = screen.getAllByRole("button");
  expect(button).toHaveLength(7);
});
