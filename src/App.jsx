import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authServise from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServise
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login({ data }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div>Not Loading</div>
  ) : (<div>Loading</div>) ;
}

export default App;
