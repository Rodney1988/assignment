import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../../../store/store';
import { fetchAllItems } from '../../../api/itemsThunk';
import { updateLocalStorageActiveItem } from '../../../helpers';
import { setActiveItem } from '../../../store/itemSlice';

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const itemsObj = useSelector((state: RootState) => state.itemsObject);
  const navigate = useNavigate();

  const itemsObjectData = itemsObj.itemsData;
  const activeItemId = itemsObj.activeItemId;

  // Transform itemsObjectData into an array of objects
  const itemsArraySorted = useMemo(() => {
    if (!itemsObjectData) return [];
    const sortedItems = Object.entries(itemsObjectData)
      .map(([key, value]) => ({
        key,
        ...value,
      }))
      .sort((a, b) => a.index - b.index); // Sort by ascending order of index

    return sortedItems;
  }, [itemsObjectData, activeItemId]);

  useEffect(() => {
    dispatch(fetchAllItems());
  }, []);

  if (itemsObj.loading) return <div>Loading...</div>;
  if (itemsObj.error) return <div>Error Fetching: {itemsObj.error}</div>;

  console.log(itemsObj);

  const handleClick = (key: string) => {
    dispatch(setActiveItem(key));
    updateLocalStorageActiveItem(key);
    navigate(`/itemPage/${key}`);
  };

  return (
    <>
      <pre>Main Page</pre>
      <div style={{ display: 'flex' }}>
        {itemsArraySorted.map((item) => (
          <div
            onClick={() => handleClick(item.key)}
            style={{
              backgroundColor: 'blue',
              width: '200px',
              margin: '2px',
              border: item.active ? '2px solid red' : '',
            }}
            key={item.key}
          >
            <p>{item.title}</p>
            <pre>{item.active ? 'active' : 'false'}</pre>
          </div>
        ))}
      </div>
    </>
  );
};
