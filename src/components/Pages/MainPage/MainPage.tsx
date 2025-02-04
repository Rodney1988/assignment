import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Snackbar from '@mui/material/Snackbar';
import 'swiper/css';
import 'swiper/css/pagination';

import { AppDispatch, RootState } from '../../../store/store';
import { fetchAllItems } from '../../../api/itemsThunk';
import { CustomCard } from '../../Molecules/CustomCard';
import { setSnackbarString } from '../../../store/itemSlice';

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const itemsObj = useSelector((state: RootState) => state.itemsObject);
  const { itemsData: itemsObjectData, activeItemId, snackbarString } = itemsObj;

  // Transform itemsObjectData into an array of objects
  const itemsArraySorted = useMemo(() => {
    if (!itemsObjectData) return [];
    const sortedItems = Object.entries(itemsObjectData)
      .map(([key, value]) => ({
        key,
        ...value,
      }))
      .sort((a, b) => a.index - b.index); // Sort by ascending order of index as as task requirement

    return sortedItems;
  }, [itemsObjectData, activeItemId]);

  // fetch all items on load
  useEffect(() => {
    dispatch(fetchAllItems());
  }, []);

  if (itemsObj.loading) return <div>Loading...</div>;
  if (itemsObj.error) return <div>Error Fetching: {itemsObj.error}</div>;

  const handleSnackbarClose = () => {
    dispatch(setSnackbarString(''));
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '100px' }}>Main Page</h1>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        scrollbar={{ draggable: true }}
        breakpoints={{
          // when window width is >= 620px, etc
          620: {
            slidesPerView: 2,
          },

          940: {
            slidesPerView: 3,
          },

          1250: {
            slidesPerView: 4,
          },

          1500: {
            slidesPerView: 5,
          },
          1800: {
            slidesPerView: 6,
          },
          2200: {
            slidesPerView: 7,
          },
        }}
      >
        {itemsArraySorted.map((item) => {
          return (
            <SwiperSlide
              key={item.key}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CustomCard item={item} idKey={item.key} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Snackbar
        open={!!snackbarString}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        message={snackbarString}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};
