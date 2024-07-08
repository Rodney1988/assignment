import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { setActiveItem } from '../../store/itemSlice';
import { Item } from '../../types';
import { updateLocalStorageActiveItem } from '../../helpers';
import { AppDispatch } from '../../store/store';
import fallbackImage from '../../images/fallback_image.png';

interface CustomCardProps {
  item: Item;
  idKey: string;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  item: { title, description, image, active },
  idKey,
}) => {
  const [imgSrc, setImgSrc] = useState(image || fallbackImage);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClick = (key: string) => {
    dispatch(setActiveItem(key));
    updateLocalStorageActiveItem(key);
    navigate(`/itemPage/${key}`);
  };
  return (
    <Card
      sx={{
        width: 275,
        border: active ? '3px solid red' : '',
        cursor: 'grab',
      }}
    >
      <img
        src={imgSrc}
        alt={title}
        onError={() => setImgSrc(fallbackImage)}
        style={{ height: '100px', width: '100%', objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description === 'Not available'
            ? 'Description not available'
            : description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick(idKey)}>
          More Details
        </Button>
      </CardActions>
    </Card>
  );
};
