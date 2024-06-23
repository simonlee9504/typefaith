import { useState } from "react";
import { Button } from "@nextui-org/react";
import * as DarkModeToggle from "https://googlechromelabs.github.io/dark-mode-toggle/src/dark-mode-toggle.mjs";

function App() {
  const toggle = document.querySelector("dark-mode-toggle");
  const [count, setCount] = useState(0);

  return (
    <main>
      {/* <>
        <div>
          <h1>Vite + React</h1>
        </div>
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </> */}
      <>hi</>
    </main>
  );
}

export default App;
