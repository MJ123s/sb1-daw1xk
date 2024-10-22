import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Atom } from 'lucide-react';
import TopicPage from './components/TopicPage';
import PhysicsCalculator from './components/PhysicsCalculator';
import topics from './data/topics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
              <Atom size={24} />
              <span>Physics Helper</span>
            </Link>
          </div>
        </nav>

        <main className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<PhysicsCalculator />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;