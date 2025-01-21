self.addEventListener('push', (event) => {
  const data = event.data.json();

  const timestamp = new Date(data.timestamp).toLocaleString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  });

  self.registration.showNotification(data.title, {
    body: `${data.body} (Sent at: ${timestamp})`,
    icon: '/Desk/logo192.png',
  });
});
