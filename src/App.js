import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const CampaignList = () => <div className="card">Campaign List Page</div>;
const NewCampaign = () => <div className="card">New Campaign Page</div>;
const Navbar = () => <nav className="navbar">Campaign Manager</nav>;

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<CampaignList />} />
            <Route path="/new-campaign" element={<NewCampaign />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
