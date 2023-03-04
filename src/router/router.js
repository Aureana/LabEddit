import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../page/loginPage/Login";
import Register from "../page/registerPage/Register";

import PostsPage from "../page/postPage/Posts";
import ComentariosPage from "../page/comentariosPage/Comentarios";

// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// import PokedexPage from "../pages/PokedexPage/PokedexPage";
// import PokemonDetailPage from "../pages/PokemonDetailPage/PokemonDetailPage";


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
           path="/comentarios"
           element={
             <ComentariosPage />
           }
         />
       </Routes>
     </BrowserRouter>
  );
 }
 
 export default Router;