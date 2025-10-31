import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./routes";
import { Button } from "./components/ui/button";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Button variant={"outline"}>button</Button>
    </AuthProvider>
  );
}


export default App;
