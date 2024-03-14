import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AuthenticatedLayout from './comp/AuthenticatedLayout';
import Post from './features/posts/Post';
import _404 from './pages/_404';
import Signup from './features/auth/Signup';
import Signin from './features/auth/Signin';
import Layout from './comp/Layout';
import RequireAuth from './features/auth/RequireAuth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route element={<AuthenticatedLayout />}>
            <Route index element={<Home />} />
            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="posts/:postId" element={<Post />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<_404 />} />
      </Route>
    </Route>
    // <Route>
    //   <Route element={<Layout />}>
    //     <Route index element={<Home />} />
    //     <Route path="profile">
    //       <Route index element={<Profile />} />
    //       <Route path="posts/:postId" element={<Post />} />
    //     </Route>
    //   </Route>
    //   <Route path="signup" element={<Signup />} />
    //   <Route path="signin" element={<Signin />} />
    //   <Route path="*" element={<_404 />} />
    // </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
