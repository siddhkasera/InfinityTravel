import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import '../cssfiles/Notification.css';
const NotificationCard = styled(Card)({
  marginBottom: '20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
});

const NotificationItem = ({ title, message }) => (
  <NotificationCard>
    <CardContent>
      <Typography variant="subtitle1" gutterBottom>{title}</Typography>
      <Typography variant="body2">{message}</Typography>
      <Typography variant="body2" className="see-more">See more</Typography>
    </CardContent>
  </NotificationCard>
);

const notifications = [
  {
    title: 'Your flight is coming soon',
    message: 'Check-in for your upcoming flight to Bali is available now. Avoid the last-minute rush and secure your seat!',
  },
  {
    title: 'How was your trip?',
    message: 'We hope you enjoyed your journey with us. Could you spare a moment to provide feedback?',
  },
  {
    title: 'Big Sale - $10 to New York',
    message: 'Limited time offer: Fly to New York for as low as $10! Book your adventure now and save big.',
  },
  {
    title: 'Flights to LA on discount!',
    message: 'Discover the City of Angels. Exclusive discounts on flights to Los Angeles available this week.',
  }
];

export default function Notifications() {
  return (
    <Box className="container">
      <Typography variant="h6" className="header">Notifications</Typography>
      {notifications.map((notification, index) => (
        <NotificationItem key={index} title={notification.title} message={notification.message} />
      ))}
    </Box>
  );
}
