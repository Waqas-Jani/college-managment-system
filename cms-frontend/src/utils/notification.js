import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
export default function (type, message, title) {
    switch (type) {
        case 'info':
            NotificationManager.info(message, title, 3000);
            break;
        case 'success':
            NotificationManager.success(message, title, 3000);
            break;
        case 'warning':
            NotificationManager.warning(message, title, 3000);
            break;
        case 'error':
            NotificationManager.error(message, title, 3000);
            break;
    }
};