import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import image1 from "../Assests/image1.jpg";
import image3 from "../Assests/image3.jpg";
import image2 from "../Assests/image2.jpg";
import onlineeducation from "../Assests/onlineeducation.jpg";

function CarouselPage(props) {
  const items = [
    {
      img: image1,
      description: "Learn without limits",
    },
    {
      img: image3,
      description: "Enjoy learning from the comfort of your homes",
    },
    {
      img: image2,
      description: "Up Skill",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  const paperStyle = {
    padding: 0.5,
    height: "80vh",
    width: 1200,
    margin: "20px auto",
  };
  return (
    <div height="90vh" align="center">
      <Paper style={paperStyle}>
        <img  width="70%" alt={props.item.description} src={props.item.img} />
        <p>{props.item.description}</p>
      </Paper>
    </div>
  );
}
export default CarouselPage;
