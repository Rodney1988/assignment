import { useNavigate } from 'react-router-dom';

export const ItemPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <pre>Item Page</pre>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};
