import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Redirect } from 'react-router-dom';
import API from '../../libraries/API';
import axios from 'axios';
import {connect} from 'react-redux';
import {Login} from '../../store/actions/filterRoadAction';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

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
}));

const SignIn = ({onLogin}) => {
    const classes = useStyles();
    const [signIn, setSignIn]  = React.useState({
        email:'',
        password:'',
        showPassword:false,
        isLoading:false,
        redirect:false,
        error:false,
        massage:''
    });
    const handleClickShowPassword = () => {
        setSignIn({ ...signIn, showPassword: !signIn.showPassword });
    };
    const handleChange = prop => event => {
        setSignIn({ ...signIn, [prop]: event.target.value });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        // // setSignIn({...signIn, isLoading:true});
        // axios.post('http://192.168.13.108:8283/api/login', {
        //     email: 'sovannapoung@gmail.com',
        //     password: 123456
        // }).then(response => {
        //     sessionStorage.setItem('userData', JSON.stringify(response.data));
        //     setSignIn({
        //         ...signIn,
        //         redirect:true
        //     })
        // })
        // .catch(error => {
        //     setSignIn({
        //       ...signIn,
        //       error:true,
        //       massage:error.response.data.message
        //     })
        // });

        onLogin({
            email: signIn.email,
            password: signIn.password
        }).then(
            (e) => setSignIn({
                    ...signIn,
                    redirect:true
                })
            ,
            ({data}) => setSignIn({
                ...signIn,
                massage:data
            })
        );
    }
    console.log(signIn.massage)

    if(sessionStorage.getItem("userData")){ 
        return (<Redirect to="/contact"/>)
    }

    if(signIn.redirect){
        return (<Redirect to="/about" />)
    }
    return (
        <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">
                Sign in
            </Typography>
            <Typography variant="h6" color="error">
                { signIn.error ? signIn.massage:'' }
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField                    
                    label="Email Address"
                    value={signIn.email}
                    variant="outlined"
                    margin="normal"
                    // type='email'
                    // required
                    fullWidth
                    autoFocus
                    onChange={handleChange('email')}
                />
                <TextField
                    label="Password"
                    value={signIn.password}
                    variant="outlined"
                    margin="normal"
                    // required
                    fullWidth                    
                    type={signIn.showPassword ? 'text' : 'password'}
                    onChange={handleChange('password')}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowPassword}
                            >
                              {signIn.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                    }}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={signIn.isLoading}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>                        
                    </Grid>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        </Container>
    );
}

const mapDispatchToProps = {
    onLogin:Login
}

export default connect(null, mapDispatchToProps)(SignIn);