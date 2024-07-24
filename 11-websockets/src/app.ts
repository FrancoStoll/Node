import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log('Client connected');


    ws.on('error', console.error);

    ws.on('message', function message(data) {


        const payload = {
            type: "custom-message",
            payload: data.toString().toUpperCase(),
        };



        // Envia a todos incluyendo
        // wss.clients.forEach(function each(client) {
        //     if (client.readyState === WebSocket.OPEN) {
        //         client.send(JSON.stringify(payload), { binary: false });
        //     }
        // });

        // Envia a todos menos uno
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(payload), { binary: false });
            }
        });

        // ws.send(JSON.stringify(payload));

    });

    // ws.send('Hola desde el servidor');

    ws.on('close', () => {
        console.log('Client disconnected')
    })
});

console.log('Server runing on port http://localhost:3000')