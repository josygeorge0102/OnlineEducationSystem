import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';


function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 500}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
            <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Science
        </Typography>
        <Typography variant="body2" color="text.secondary">
        School students are naturally curious, which makes science an ideal subject for them to learn. Science allows students to explore their world and discover new things.
        </Typography>
      </CardContent>
      
    </Card>
    
  );
}
export default ImgMediaCard;