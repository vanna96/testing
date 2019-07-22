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
import {changePassword} from '../../store/actions/filterRoadAction';
import {connect} from 'react-redux';

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
        width: '100%',
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
    }
}));

const  Register = ({onChangePassword}) => {
    const classes = useStyles();
    const [changePassword, setChangePassword] = React.useState({
        old_password:'',
        new_password:'',
        confirm_password:'',
        color:'',
        isLoading:false,
        error:false,
        messages:[]        
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        setChangePassword({...changePassword, isLoading:true});
        onChangePassword({
            old_password: changePassword.old_password,
            new_password: changePassword.new_password,
            confirm_password: changePassword.confirm_password,           
        })
        .then(
            (res) => {
                var arrayResults = [];
                arrayResults.push(res.data.message);
                setChangePassword({
                    ...changePassword,
                    old_password:'',
                    new_password:'',
                    confirm_password:'',
                    color:'#3fa333',
                    messages:arrayResults
                });
            }
            ,
            (err) => {
                var arrayResult = [];
                const results = err.response.data.errors;
                Object.keys(results).map((item) => {
                    results[item].map((key) => {
                        arrayResult.push(key);
                      });                    
                });
                setChangePassword({
                    ...changePassword,
                    messages:arrayResult,
                })
            }
        );
    }
    const handleChange = event => {
        setChangePassword({ ...changePassword, [event.target.name]: event.target.value });
    };

    React.useEffect(() => {
        if (changePassword.new_password !== changePassword.confirm_password) {
            setChangePassword({...changePassword, error: true, isLoading:true})
        } else {
            setChangePassword({...changePassword, error: false, isLoading:false})
        }
    }, [changePassword.confirm_password, changePassword.new_password])
   
    const loopMessage = changePassword.messages.map( (lists, key) => {
        return <p className={classes.text} style={{color: changePassword.color}}>{lists}</p>  
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <div style={{width:'100%'}}>
                    { loopMessage.length > 0 ? loopMessage :'' }
                </div>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField                                
                                label="Old password"
                                variant="outlined"
                                value={changePassword.old_password}
                                required
                                fullWidth
                                name="old_password"
                                type="password"
                                onChange={handleChange}
                                autoComplete="true"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="New Password"
                                variant="outlined"
                                name="new_password"                                
                                type="password"
                                value={changePassword.new_password}
                                required
                                fullWidth
                                onChange={handleChange}
                                autoComplete="true"                       
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={changePassword.error}                          
                                label="Confirm New Password"
                                name="confirm_password"
                                type="password"
                                variant="outlined"
                                value={changePassword.confirm_password}
                                required
                                fullWidth
                                onChange={handleChange}
                                autoComplete="true"                   
                            />
                        </Grid>
                    </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={changePassword.isLoading}
                >
                    Change Password
                </Button>
                </form>
            </div>
        </Container>
  );
}

const mapDispatchToProps = {
    onChangePassword:changePassword
}

export default connect(null, mapDispatchToProps)(Register);    