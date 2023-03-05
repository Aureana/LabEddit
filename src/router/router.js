import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../page/loginPage/Login";
import Register from "../page/registerPage/Register";
import PostsPage from "../page/postPage/Posts";
import CommentsPage from "../page/commentsPage/Comments";


function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Login />
          }
        />
        <Route
          path="/register"
          element={
            <Register />
          }
        />
        <Route
          path="/posts"
          element={
            <PostsPage />
          }
        />
        <Route
          path="/comments"
          element={
            <CommentsPage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;