import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from '../src/pages/Home';
import SubmitIdeaPage from './pages/SubmitIdeapage';
import IdeaDetailPage from './pages/IdeaDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="submit" element={<SubmitIdeaPage />} />
          <Route path="idea/:ideaId" element={<IdeaDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;