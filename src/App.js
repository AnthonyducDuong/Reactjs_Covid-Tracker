import Header from "./components/Header";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CovidTracker from "./features/CovidTracker"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to='/covid-tracker' />} />
        <Route path="/covid-tracker/*" element={<CovidTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
