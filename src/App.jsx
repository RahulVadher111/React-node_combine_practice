import { Link, Route, Routes } from "react-router-dom";

import UserList from "./components/UserList.jsx";
import { UserProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <>
      <div>
        <UserProvider>
          <Routes>
            <Route path="/" element={<UserList />} />
          </Routes>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
