import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Destination from './pages/Destination';
import Crew from './pages/Crew';
import Technology from './pages/Technology';

function App() {
  const location = useLocation();

  const getBackgroundClass = () => {
    // Only return the base class here, responsive variants are handled in CSS
    switch (location.pathname) {
      case '/': return 'bg-home';
      case '/destination': return 'bg-destination';
      case '/crew': return 'bg-crew';
      case '/technology': return 'bg-technology';
      default: return 'bg-home';
    }
  };

  return (
    <div className={`min-h-screen bg-cover-fixed transition-all duration-700 ${getBackgroundClass()}`}>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/technology" element={<Technology />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
