import React from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilCallback
} from "recoil";
import "./styles.css";

const counterState = atom({
  key: "counterState",
  default: 0
});

const roughCounterState = selector({
  key: "roughCounterState",
  get: ({ get }) => Math.floor(get(counterState) / 10),
  set: ({ set }, newValue) => {
    set(counterState, newValue * 10);
  }
});

export default function App() {
  const counter = useRecoilValue(counterState);
  return (
    <div className="App">
      <h1>Hello CodeSandbox {counter}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <CounterButton />
      <CounterButton />
      <CounterButton />
      <UpdateOnlyButton />
      <AlertButton />
      <RoughButton />
    </div>
  );
}

const CounterButton = () => {
  const [count, setCount] = useRecoilState(counterState);
  return (
    <p>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </p>
  );
};

const UpdateOnlyButton = () => {
  const setCount = useSetRecoilState(counterState);
  return (
    <p>
      <button onClick={() => setCount(c => c + 1)}>incr</button>
    </p>
  );
};

const AlertButton = () => {
  const showAlert = useRecoilCallback(async ({ getPromise }) => {
    const counter = await getPromise(counterState);

    alert(counter);
  }, []);

  return (
    <p>
      <button onClick={showAlert}>Show counter value</button>
    </p>
  );
};

const RoughButton = () => {
  const [roughValue, setRoughValue] = useRecoilState(roughCounterState);
  return (
    <p>
      <button onClick={() => setRoughValue(c => c + 1)}>{roughValue}</button>
    </p>
  );
};
