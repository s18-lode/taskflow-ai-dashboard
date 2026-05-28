"use client";

import { Provider } from "react-redux";

import { store } from "./store";

export function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}


{/*dependency injection through context . React Redux internally uses Context API.*/}