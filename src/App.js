import logo from "./logo.svg";
import "./App.css";
import SubmitArticle from "./components/SubmitArticle";
import ArticleList from "./components/ListArticles";
import AdminDashboard from "./components/AdminDashboard";
import 'water.css/out/water.css';
function App() {
  return (
    <div className="App">
      <SubmitArticle />
      <ArticleList />
      <AdminDashboard />
    </div>
  );
}

export default App;
