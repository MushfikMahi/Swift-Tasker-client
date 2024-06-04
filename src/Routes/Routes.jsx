import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErroPage";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layouts/Dashboard";
import TaskCreatorHome from "../Pages/Dashboard/TaskCreator/TaskCreatorHome/TaskCreatorHome";
import AddTask from "../Pages/Dashboard/TaskCreator/AddTask/AddTask";
import MyTask from "../Pages/Dashboard/TaskCreator/MyTask/MyTask";
import PurchaseCoin from "../Pages/Dashboard/TaskCreator/PurchaseCoin/PurchaseCoin";
import PaymentHistory from "../Pages/Dashboard/TaskCreator/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "taskerHome",
        element: <TaskCreatorHome />,
      },
      {
        path: "addtask",
        element: <AddTask />,
      },
      {
        path: "mytask",
        element: <MyTask />,
      },
      {
        path: "purchasecoin",
        element: <PurchaseCoin />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
    ],
  },
]);
