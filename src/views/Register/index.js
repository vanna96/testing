import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {register} from '../../store/actions/filterRoadAction';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    BorderColor:{
        borderColor: 'red'
    },
    multilineColor:{
        borderColor:'red'
    },
    text:{
        color:'red',
        margin:'10px',
        fontSize:'16px'
    },
    navlink:{
        color:'#3f51b5'
    }
}));

const  Register = ({onRegister}) => {
    const classes = useStyles();
    const [register, setRegister] = React.useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        color:false,
        isLoading:false,
        error:false,
        redirect:false,
        messages:[]        
    })
    const handleSubmit = (e) =>{
        setRegister({...register, isLoading:true});
        e.preventDefault();
        onRegister({
            name: register.name,
            email: register.email,
            password: register.password,
            password_confirmation: register.password_confirmation,            
        })
        .then(
            (res) => setRegister({
                ...register,
                redirect:true,
            })
            ,
            (err) => {
                var arrayResult = [];
                // const results = err.response.data.errors;
                const results = {
                    "errors": {
                        "email": [
                            "The email has already been taken."
                        ],
                        "password": [
                            "The password confirmation does not match."
                        ]
                    }
                }
                Object.keys(results).map(() => {
                    const objectError = results['errors'];
                    Object.keys(objectError).map(function(item){
                        const eachObject = objectError[item];
                        eachObject.map(function(list){
                            arrayResult.push(list);
                        });
                    });
                });
                setRegister({
                    ...register,
                    messages:arrayResult,
                    error:true
                })
            }
        );
    }
    const handleChange = event => {
        setRegister({ ...register, [event.target.name]: event.target.value });
    };

    React.useEffect(() => {
        if (register.password !== register.password_confirmation) {
            setRegister({...register, color: true, isLoading:true})
        } else {
            setRegister({...register, color: false, isLoading:false})
        }
    }, [register.password_confirmation, register.password])
   
    const loopMessage = register.messages.map( (lists) => {
        return <p className={classes.text}>{lists}</p>  
    })

    if(register.redirect){
        return (<Redirect to="/login" />)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <div style={{width:'100%'}}>
                    { register.error ? loopMessage :'' }
                </div>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                value={register.name}
                                variant="outlined"
                                required
                                fullWidth                                
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField                                
                                label="Email Address"
                                variant="outlined"
                                required
                                fullWidth
                                name="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                name="password"
                                label="Password"
                                type="password"
                                required
                                fullWidth
                                onChange={handleChange}                             
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={register.color}                          
                                label="Confirm Password"
                                name="password_confirmation"
                                type="password"
                                variant="outlined"
                                required
                                fullWidth
                                onChange={handleChange}                     
                            />
                        </Grid>
                    </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={register.isLoading}
                >
                    Register
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <NavLink to="/login" className={classes.navlink}>
                        Already have an account? Login
                    </NavLink>
                    </Grid>
                </Grid>
                </form>
            </div>
        </Container>
  );
}

const mapDispatchToProps = {
    onRegister:register
}

export default connect(null, mapDispatchToProps)(Register);    