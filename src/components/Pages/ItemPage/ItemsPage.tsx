import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CustomDetailCard } from '../../Molecules/CustomDetailCard';

export const ItemPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '100px' }}>Item Page</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px',
        }}
      >
        <CustomDetailCard />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{ textAlign: 'center' }}
          onClick={() => navigate(-1)}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};
