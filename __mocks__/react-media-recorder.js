export const useReactMediaRecorder = jest.fn(() => ({
  status: "idle",
  startRecording: jest.fn(),
  stopRecording: jest.fn(),
  mediaBlobUrl: null,
}));
