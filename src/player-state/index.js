import { nanoid } from 'nanoid';

const currentPlayer = {
  id: nanoid(),
  name: 'Anonimous',
  score: 0,
  isLoggedIn: false,
};

export default currentPlayer;
