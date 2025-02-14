import { BrowserRouter, Route, Routes } from "react-router";
import routes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, screen }) => (
          <Route key={path} path={path} element={screen} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
