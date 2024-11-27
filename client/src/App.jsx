import React from "react";
import { observer } from "mobx-react-lite";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import { authStore } from "./stores/authStore";

const App = observer(() => {
  return (
    <div className="App">
      {authStore.user ? <Chat /> : <Auth />}
    </div>
  );
});

export default App;
