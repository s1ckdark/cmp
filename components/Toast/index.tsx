import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
    text: string;
    type: "default" | "success" | "warning" | "error" | "loading";
    onClose?: () => void;
}

const autoClose = 300;

export const Toast = (type: string, text: string, onClose?: () => void) => {
    const toastOptions = {
        onClose: onClose,
    };

    switch (type) {
        case "default":
            toast(text, toastOptions);
            break;
        case "success":
            toast.success(text, toastOptions);
            break;
        case "warning":
            toast.warning(text, toastOptions);
            break;
        case "error":
            toast.error(text, toastOptions);
            break;
        case "loading":
            toast.loading(text, toastOptions);
        default:
            toast(text, toastOptions);
    }
};

const Toastify = () => {
    return <ToastContainer position="top-center" autoClose={autoClose} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="light" />;
};
export default Toastify;
