import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { AppDispatch, RootState } from '../../../store/store';
import { fetchAllItems } from '../../../api/itemsThunk';

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const itemsObj = useSelector((state: RootState) => state.itemsObject);

  useEffect(() => {
    dispatch(fetchAllItems());
  }, []);

  console.log(itemsObj);

  if (itemsObj.loading) return <div>Loading...</div>;
  if (itemsObj.error) return <div>Error Fetching: {itemsObj.error}</div>;

  return (
    <>
      <pre>Main Page</pre>
      <button></button>
    </>
  );
};
