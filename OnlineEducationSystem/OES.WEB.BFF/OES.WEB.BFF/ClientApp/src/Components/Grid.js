import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomBtn from "./CustomBtn";
import { ClassNames } from "@emotion/react";


const styles=makeStyles({
    wrapper:{
        display:"flex",
        flexDirection: "column", 
        alignItems: "center", 
        padding: "0 5rem 0 5rem"
    },
    item:{
        paddingTop:"1rem"
    }
})
function Grid(props){
    const{icon,title,btnTitle}=props;
    const classes=styles();
    return(
        <div className={ClassNames.wrapper}>
            <div className={ClassNames.item}>{icon}</div>
            <Typography className={ClassNames.item} variant="h5">{title}</Typography>
            <div className={ClassNames.item}>
                <CustomBtn txt={btnTitle} width="400"></CustomBtn>
            </div>
        </div>

    )
}

export default Grid
