export const useAppDispatch = () => {
  const dispatchedActions= [];
  const mockDispatch = (action) => {
    dispatchedActions.push(action);
    return action;
  };
  return mockDispatch;
};
