import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CustomDetailCard } from '../../Molecules/CustomDetailCard';

/* ItemPage uses a generic "customDetailCard" and puts a "Go Home" button below */

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
          onClick={() => navigate('/')}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};
