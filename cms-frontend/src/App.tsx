import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import MainRoutes from "./routes";

const theme = createTheme({
  palette: {
    primary: lightBlue,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainRoutes />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
