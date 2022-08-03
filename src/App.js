import "./App.css";
import SimpleForm from "./Component/SimpleForm";
import UserProvider from "./context/UserProvider";
import UserPage from "./Component/UserPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const publicRoute = [
    { path: "/", component: <SimpleForm /> },
    { path: "/add-user", component: <SimpleForm /> },
    { path: "/edit-user/:id", component: <SimpleForm isEdit /> },
    { path: "/userpage", component: <UserPage /> },
  ];
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="container">
        
          <Routes>
            {publicRoute.map(({ path, component }, idx) => (
              <Route key={idx} exact {...{ path, element: component }} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
