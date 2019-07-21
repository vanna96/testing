import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from '../../images/404.jpg';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'; 
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    centered:{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform:' translate(-50%, -50%)',
    },
    divider:{
        marginTop:'10px',
        width: '5px',
        height:'75px',
        color: 'black'
    },
    marginTop:{
        position:"fixed",
        top:'20%'
    }
}));


export default function NotFound() {
    const classes = useStyles();
    return (
        <div className={classes.centered}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <img src={logo} alt="Logo" />
                </Grid>
                <Grid item xs={6}>                
                    <Grid container className={classes.marginTop}>   
                        <Grid item xs={1}>
                            <Divider  className={classes.divider}/>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h2">
                                Oops!
                            </Typography>
                            <Typography variant="h6">
                                There's something wrong
                            </Typography>
                            <br/>
                            <NavLink exact to="/" style={{textDecoration: 'none'}}>
                                <Button variant="outlined" className={classes.button} color="secondary">
                                    Go back
                                </Button>
                            </NavLink>                        
                        </Grid>        
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}