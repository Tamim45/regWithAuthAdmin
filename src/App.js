import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContainer, Header, MainContainer } from "./components";

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex bg-primary"></div>
      <Header />
      <main className="mt-24 p-8 w-full">
        <Routes>
          <Route path="/*" element={<MainContainer />}></Route>
          <Route path="/createItem" element={<CreateContainer />}>
            {" "}
          </Route>
        </Routes>
      </main>
    </AnimatePresence>
  );
};

export default App;
