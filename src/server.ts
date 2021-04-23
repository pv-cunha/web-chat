import { http } from './http';
import './websocket/client';

const PORT = process.env.PORT || 3333;

http.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
