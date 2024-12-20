import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CampaignListPage from './pages/CampaignListPage';

const NewCampaign = () => <div className="card">New Campaign Page</div>;

function App() {
  return (
    <Router>
      <div className="app">
        <main className="container">
          <Routes>
            <Route path="/" element={<CampaignListPage />} />
            <Route path="/new-campaign" element={<NewCampaign />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
