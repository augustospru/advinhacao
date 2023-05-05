import { io } from "socket.io-client";

const socket = io('http://localhost:10000');

socket.on('connect', () => {
    console.log('Connected to server');
});
  
socket.on('init', (msg) => {
    console.log('Initial state:', msg);
    socket.emit('temptative', {char: 'a'});
    socket.emit('temptative', {char: 'b'});
});

socket.on('word', (msg) => {
    console.log('Got word:', msg);
});