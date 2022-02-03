import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import image1 from "../Assests/sonali-image1.jpeg"; 
import image2 from "../Assests/sonali-image2.jpg";  
import image3 from "../Assests/sonali-image3.jpg"; 
import { useNavigate } from "react-router-dom";


function MediaCard() {
  const navigate = useNavigate();
    return (
        <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={12}
        justifyContent="center"
      >
<Card sx={{ maxWidth: 250 }}>
<CardMedia
  component="img"
  height="140"
  image={image1}
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
    Science
  </Typography>
</CardContent>
<CardActions>
  <Button size="small" onClick={() => navigate("classroom")}>Learn More</Button>
</CardActions>
</Card>

<Card sx={{ maxWidth: 250 }}>
<CardMedia
  component="img"
  height="140"
  image={image2}
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
  History
  </Typography>
</CardContent>
<CardActions>
  <Button size="small">Learn More</Button>
</CardActions>
</Card>

<Card sx={{ maxWidth: 250 }}>
<CardMedia
  component="img"
  height="140"
  image={image3}
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
  Chemistry
  </Typography>
</CardContent>
<CardActions>
  <Button size="small" >Learn More</Button>
</CardActions>
</Card>

</Stack>
    );
  }
  export default MediaCard;