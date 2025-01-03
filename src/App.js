import './global.css';
import { ToastContainer } from 'react-toastify';

import CampaignListPage from './components/CampaignListPage';
import Notifications from './components/Notifications';

function App() {
  return (
    <div className="app">
      <main className="container">
        <Notifications />
        <CampaignListPage />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />

      </main>
    </div>
  );
}

export default App;
