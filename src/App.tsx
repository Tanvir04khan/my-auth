import { Route, Routes } from "react-router";
import routes from "./routes/routes";

function App() {
  return (
    <Routes>
      {routes.map(({ path, screen }) => (
        <Route key={path} path={path} element={screen} />
      ))}
    </Routes>
  );
}

export default App;
