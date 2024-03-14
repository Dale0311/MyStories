import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Layout from './comp/Layout';
import Post from './features/posts/Post';
import _404 from './pages/_404';
import Signup from './features/auth/Signup';
import Signin from './features/auth/Signin';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile">
          <Route index element={<Profile />} />
          <Route path="posts/:postId" element={<Post />} />
        </Route>
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="*" element={<_404 />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
