import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        padding: '5px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom:20,
        flexGrow: 1
    },
    search:{
        paddingLeft: 10,
        paddingRight: 10
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    margin:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));