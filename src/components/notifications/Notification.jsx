import '../../styles/components/notification.css';

function Notification({
  message,
  type,
  visible
}) {
  return (
    <div id="notification-container">
      <div
        className={`
          notification
          notification-${type}
          ${visible ? 'show' : ''}
        `}
      >
        {message}
      </div>
    </div>
  );
}

export default Notification;