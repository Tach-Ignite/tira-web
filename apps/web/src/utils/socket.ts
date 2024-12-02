import { io } from 'socket.io-client';

const socket = io('wss://api.demo.poc2production.com');
export default socket;
