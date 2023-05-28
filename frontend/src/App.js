import "./App.css";
import { configureStore } from "@reduxjs/toolkit";
import runCodeReducer from "./reducers/run-code-reducer";
import { Provider } from "react-redux";
import CodeEditor from "./components/CodeEditor/CodeEditor";

const store = configureStore({
  reducer: {
    runCode: runCodeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CodeEditor />
      </div>
    </Provider>
  );
}

export default App;
