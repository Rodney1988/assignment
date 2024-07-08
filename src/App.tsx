import { NavBar } from './components/Molecules/NavBar';
import { MainPage } from './components/Pages/MainPage/MainPage';
import { ItemPage } from './components/Pages/ItemPage/ItemsPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={'/itemPage/:id'} element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
};
