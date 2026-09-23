import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRout";
import Tasks from "./components/Tasks";
import Header from "./components/Layout";
import Layout from "./components/Layout";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/tasks"
              element={
                <Layout>
                  <Tasks />
                </Layout>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
