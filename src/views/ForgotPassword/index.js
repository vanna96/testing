import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import {reset} from '../../store/actions/filterRoadAction';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
        backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    text:{
        margin:'10px',
        fontSize:'16px'
    }
}));

const ResetPassword = ({onReset}) => {
    const classes = useStyles();
    const [reset, setReset]  = React.useState({
        email:'',
        isLoading:false,
        error:false,
        massages:[],
        color:''
    });
    const handleChange = prop => event => {
        setReset({ ...reset, [prop]: event.target.value });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setReset({
            ...reset,
            isLoading:true,
        })
        onReset({
            email:reset.email
        }).then(
            (res) => {
                var arrayResult = [];
                const results = {
                    "status": 201,
                    "message": "Link has been send to your mail."
                }
                Object.keys(results).map((item) => {
                    if(item === "message"){
                        arrayResult.push(results[item])
                    }  
                });
                setReset({
                    ...reset,
                    email: '',
                    massages:arrayResult,
                    color:'#3fa333'
                })
            },
            (err) => {
                var arrayResult = [];
                // const results = err.response.data;
                const results = {
                    "email": [
                        "your email doesn't exists.."
                    ]
                }
                Object.keys(results).map((item) => {
                    results[item].map((value) => {
                        arrayResult.push(value);
                    });
                });
                setReset({
                    ...reset,
                    massages:arrayResult,
                    color:'red'
                });
            }            
        );
    }

    const loopMessage = reset.massages.map( (lists) => {
        return <p className={classes.text} style={{color:reset.color}}>{lists}</p>  
    })
    return (
        <Container maxWidth="xs">
        <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Reset Password
                </Typography>
                <div style={{width:'100%'}}>
                    { loopMessage.length > 0 ? loopMessage:'' }
                </div>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField                    
                        label="Email Address"
                        value={reset.email}
                        variant="outlined"
                        margin="normal"
                        // type='email'
                        // required
                        fullWidth
                        autoFocus
                        onChange={handleChange('email')}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={reset.isLoading}
                            >
                                Reset
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <NavLink to="/login" style={{ textDecoration: 'none', color: 'unset' }} >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                >
                                    Cancel
                                </Button> 
                            </NavLink >             
                        </Grid>
                    </Grid>                    
                </form>
            </div>
        </Container>
    );
}

const mapDispatchToProps = {
    onReset:reset
}

export default connect(null, mapDispatchToProps)(ResetPassword);