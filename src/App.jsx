import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CollegePortal from "./pages/CollegePortal";
import EventLanding from "./pages/EventLanding";
import PageNotFound from "./pages/PageNotFound";


import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<CollegePortal />} />
        <Route path="/event" element={<EventLanding />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;