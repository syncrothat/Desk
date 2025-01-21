self.addEventListener('push', (event) => {
  const data = event.data.json();

  const receivedTime = new Date().toLocaleString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  });

  self.registration.showNotification(data.title, {
    body: `${data.body} (Received at: ${receivedTime})`,
    icon: '/Desk/logo192.png',
  });
});
