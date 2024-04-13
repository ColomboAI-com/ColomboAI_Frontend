'use client';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ children }) {
    return (
        <div>
            <ToastContainer/>
            {children}
        </div>
    );
}

export default App;
