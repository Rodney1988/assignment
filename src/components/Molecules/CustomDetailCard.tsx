import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import fallbackImage from '../../images/fallback_image.png';
import { RootState } from '../../store/store';
import { Item } from '../../types';

export const CustomDetailCard: React.FC = () => {
  const itemsData = useSelector(
    (state: RootState) => state.itemsObject.itemsData
  );
  const { id } = useParams<{ id: string }>();

  // Function to retrieve item details with priority to itemsData, fallback to localStorage
  const getItemDetails = (): Item | null => {
    if (itemsData && id && itemsData[id]) {
      return itemsData[id];
    } else {
      const storedItemsData = localStorage.getItem('localStorage');
      if (storedItemsData && id) {
        const parsedItemsData = JSON.parse(storedItemsData);
        return parsedItemsData[id] || null;
      }
    }
    return null;
  };
  const item = getItemDetails();
  const [imgSrc, setImgSrc] = useState(item?.image || fallbackImage);

  if (!item) {
    return (
      <pre style={{ textAlign: 'center', marginBottom: '100px' }}>
        Item not found or data unavailable.
      </pre>
    );
  }

  return (
    <Card sx={{ width: '250px' }}>
      <img
        src={imgSrc}
        alt={item.title}
        onError={() => setImgSrc(fallbackImage)}
        style={{ height: '100px', width: '100%', objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description === 'Not available'
            ? 'Description not available'
            : item.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
