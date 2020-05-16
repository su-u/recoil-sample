import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import { App } from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<p>Sus.</p>}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Suspense>
  </React.StrictMode>,
  rootElement
);
