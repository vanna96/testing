import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
}));

const  Register = () => {
    const classes = useStyles();
    const [register, setRegister] = React.useState({
        name:'',
        email:'',
        password:'',
        showPassword:false,
        isLoading:false,
        redirect: false
    })
    const handleSubmit = (e) =>{
        // setSignIn({...signIn, isLoading:true});
        e.preventDefault();
        // onLogin({
        //     email: signIn.email,
        //     password: signIn.password
        // }).then(
        //     (res) => setSignIn({...signIn, redirect:true, isLoading:true}),
        //     (err) => setSignIn({...signIn, isLoading:true})
        // );
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
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth                                
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField                                
                                label="Email Address"
                                variant="outlined"
                                required
                                fullWidth
                                name="email"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField                                
                                label="Confirm Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                required
                                fullWidth                                
                            />
                        </Grid>
                    </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/login" variant="body2">
                        Already have an account? Login
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
        </Container>
  );
}

export default Register;    