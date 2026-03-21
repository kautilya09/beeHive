import { useEffect } from "react";
import axios from "axios";
function App() {
  useEffect(() => {
    axios.get("http://localhost:2026/test")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return <h1>App Running</h1>;
}
export default App;