import Router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </div>
  );
}

export default App;
