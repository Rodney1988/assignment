import { useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { addItem } from '../../../store/itemSlice';

import { useSelector } from 'react-redux';

export const MainPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items);

  console.log(items.items);

  return (
    <>
      <pre>Main Page</pre>
      <button
        onClick={() => dispatch(addItem({ id: 'eni', name: 'duka' }))}
      ></button>
    </>
  );
};
