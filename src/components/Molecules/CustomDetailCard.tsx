import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import fallbackImage from '../../images/fallback_image.png';
import { RootState } from '../../store/store';
import { getItemDetails } from '../../helpers/helpers';

/* CustomDetailCard is a generic component that will retrieve dynamic details from Redux's state */

export const CustomDetailCard: React.FC = () => {
  const itemsData = useSelector(
    (state: RootState) => state.itemsObject.itemsData
  );
  const { id } = useParams<{ id: string }>();

  // Function to retrieve item details with priority to itemsData, fallback to localStorage

  const item = getItemDetails(itemsData, id);
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
