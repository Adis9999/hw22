import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Error = () => {
  const state = useSelector((state) => state.book.isError);
  useEffect(() => {
    if (state) {
      toast.warning(state);
    }
  }, [state]);
  return <ToastContainer position="top-right" autoClose={2000} />;
};

export default Error;
