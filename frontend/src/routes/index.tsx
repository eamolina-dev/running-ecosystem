import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import ProfilePage from "../modules/users/pages/ProfilePage";
// import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";
import EventPage from "../pages/EventPage";
import ProtectedRoute from "../components/ProtectedRoute";
// import EventsList from "../borrador/EventList"
// import EventDetail from "../borrador/EventDetail"
import { PaymentSuccess, PaymentFailure, PaymentPending } from "@/pages/Payments"
import Dashboard from "@/pages/Dashboard";
import EventForm from "@/components/forms/EventForm";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // public
      { path: "/", element: <Calendar /> },
      { path: "/calendar", element: <Calendar /> },
      { path: "/users/:id", element: <ProfilePage /> },
      { path: "/events/:id", element: <EventPage /> },
      // { path:"/events/:id", element: <EventDetail /> }, LINDO DISENIO EN FORMA DE LISTA
      // { path:"/events", element: <EventsList /> }, DEBERIA USAR UN EVENT LIST ???
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/payment/success", element: <PaymentSuccess /> },
      { path: "/payment/failure", element: <PaymentFailure /> },
      { path: "/payment/pending", element: <PaymentPending /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/events/create", element: <EventForm /> },
      { path: "/events/:id/edit", element: <EventForm /> },
      
      // private
      {
        path: "/profile",
        element: (
          <ProtectedRoute> 
            <ProfilePage />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
