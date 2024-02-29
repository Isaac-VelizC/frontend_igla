import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
        <App />
      </PrimeReactProvider>
    </Provider>
  </BrowserRouter>
);