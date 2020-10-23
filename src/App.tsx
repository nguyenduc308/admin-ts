import { TOKEN_KEY } from "constants/globalConstants";
import React from "react";
import { useDispatch } from "react-redux";
import { appStored } from "services";
import { verifyTokenAction } from "store/actions/auth.action";
import { AUTO_LOGIN } from "store/actionTypes/auth";

const App = () => {
  const dispatch = useDispatch();
  const token = appStored.getItem<string | null>(TOKEN_KEY);
  React.useEffect(() => {
    if (token) {
      dispatch(verifyTokenAction(token));
    }
  }, [token]);
  return <h1>Hello</h1>;
};

export default App;
