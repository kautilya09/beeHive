import { useEffect } from "react";
import axios from "axios";
import RootLayout from "./Layout/RootLayout"
import DashboardPage from "./Pages/DashboardPage"

function App() {
  useEffect(() => {
    axios.get("http://localhost:2026/test")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <RootLayout>
      <DashboardPage />
    </RootLayout>
  )
}
export default App;