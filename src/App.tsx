import { ItemPage } from './components/Pages/ItemPage/ItemsPage';
import { MainPage } from './components/Pages/MainPage/MainPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/itemPage/:id'} element={<ItemPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
