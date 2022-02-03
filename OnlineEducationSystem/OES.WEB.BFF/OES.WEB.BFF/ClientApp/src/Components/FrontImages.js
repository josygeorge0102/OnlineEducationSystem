import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import image2 from '../Assests/image2.jpg';
import onlineeducation from '../Assests/onlineeducation.jpg';
import image3 from '../Assests/image3.jpg';
import images4 from '../Assests/images4.jfif';

export default function TitlebarBelowImageList() {
  return (
    <ImageList sx={{ width: 1400, height: 500 }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: onlineeducation,
    title: 'Learn without limits'
    
  },
  {
    img: image2,
    title: 'Enjoy learning from the comfort of your homes'
  },
  {
    img: image3,
    title: 'Up Skill',
   
  },
  {
    img: images4,
    title: 'Future ready in online education',
    
  },
];
