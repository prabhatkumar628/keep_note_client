import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/Home.jsx";
import { Login } from "./pages/login/Login.jsx";
import { Register } from "./pages/register/Register.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { TodoProvider } from "./context/todo_context/TodoProvider.jsx";
import { LabelProvider } from "./context/label_context/LabelProvider.jsx";
import { LayoutProvider } from "./context/layout_context/LayoutProvider.jsx";
import { LabelsPage } from "./pages/labels/LabelsPage.jsx";
import { Archived } from "./pages/archived/Archived.jsx";
import { Trashed } from "./pages/trashed/Trashed.jsx";

function App() {
  return (
    <>
      <LayoutProvider>
        <AuthProvider>
          <TodoProvider>
            <LabelProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/archived" element={<Archived />} />
                  <Route path="/trashed" element={<Trashed />} />

                  <Route path="/label/:labelId" element={<LabelsPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<Register />} />
                  <Route path="/about" element={<div>about</div>} />
                </Routes>
              </BrowserRouter>
            </LabelProvider>
          </TodoProvider>
        </AuthProvider>
      </LayoutProvider>
    </>
  );
}

export default App;
