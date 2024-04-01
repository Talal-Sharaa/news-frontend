import logo from "./logo.svg";
import "./App.css";
import SubmitArticle from "./components/SubmitArticle";
import ArticleList from "./components/ListArticles";
function App() {
  return (
    <div className="App">
      <SubmitArticle />
      <ArticleList />
    </div>
  );
}

export default App;
