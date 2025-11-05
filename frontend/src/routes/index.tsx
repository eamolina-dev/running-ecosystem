import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProfilePage from "../pages/Profile";
// import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";
import EventPage from "../pages/EventPage";
import ProtectedRoute from "../components/ProtectedRoute";
import EventsList from "../borrador/EventList"
import EventDetail from "../borrador/EventDetail"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // public
      { path: "/", element: <Calendar /> },
      { path: "/calendar", element: <Calendar /> },
      { path: "/users/:id", element: <ProfilePage /> },
      { path: "/event/:id", element: <EventPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      // { path:"/events", element: <EventsList /> },
      // { path:"/events/:id", element: <EventDetail /> },
      
      // private
      {
        path: "/profile",
        element: (
          <ProtectedRoute> 
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
