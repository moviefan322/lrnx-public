import React from "react";
import { render, screen, act } from "@testing-library/react";
import { client } from "@gradio/client";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { useReactMediaRecorder } from "react-media-recorder";
import user from "@testing-library/user-event";
import AudioRecorder from "@/components/AudioRecorder";

jest.setMock("@gradio/client", client);
jest.mock("next/router", () => require("next-router-mock"));
jest.mock("@/hooks/reduxHooks");
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  gradioResponse: {
    data: "",
    is_file: false,
    name: "",
  },
  queryParams: {
    mediaBlobUrl: "",
  },
  isLoading: false,
  isError: "",
  isSuccess: false,
});

const renderComponent = () => {
  render(
    <Provider store={store}>
      <AudioRecorder />
    </Provider>
  );
};

test("renders AudioRecorder", () => {
  renderComponent();

  const audioRecorderElement = screen.getByText(
    "Click below to record your voice sample"
  );
  expect(audioRecorderElement).toBeInTheDocument();
});

test("audio recorder begins recording on click", () => {
  renderComponent();

  const audioRecorderElement = screen.getByText(
    "Click below to record your voice sample"
  );

  user.click(audioRecorderElement);
});

test("useReactMediaRecorder is called with correct options", async () => {
  renderComponent();
  expect(useReactMediaRecorder).toHaveBeenCalledWith({ audio: true });
});

test("record button click toggles recording state", async () => {
  renderComponent();
  const recordButton = screen.getByRole("button");

  expect(recordButton).toHaveStyle({ background: "rgb(30, 119, 249)" });

  await act(async () => {
    await user.click(recordButton);
  });

  expect(recordButton).toHaveStyle({ background: "red" });
  const updatedPromptText = screen.getByText("Listening");

  expect(updatedPromptText).toBeInTheDocument();
});

// test("dispatches data when recording is stopped", async () => {
//   renderComponent();

//   const recordButton = screen.getByRole("button");

//   await act(async () => {
//     await user.click(recordButton);
//     await user.click(recordButton);
//   });

//   const dispatchedActions = store.getActions();
//   expect(dispatchedActions).toEqual([
//     expect.objectContaining({
//       type: "basic/setQueryParams",
//       payload: {
//         mediaBlobUrl: expect.any(String),
//       },
//     }),
//   ]);
// });
