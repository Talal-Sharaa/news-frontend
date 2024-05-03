import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AdminDashboard from './components/AdminDashboard';
import ArticleList from './components/ArticleList';
import SubmitArticle from './components/SubmitArticle';

const App = () => {
  return (
    <Router>
      <NavBar /> {/* Include your NavBar */}
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/submit-article" element={<SubmitArticle />} />
      </Routes>
    </Router>
  );
};

export default App;
