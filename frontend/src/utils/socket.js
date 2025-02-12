import io from 'socket.io-client';
import { BASE_URL } from './constants';

export default createSocketConnection = () => {
    return io(BASE_URL);
}