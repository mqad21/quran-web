import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#03f74a'
        },
        white: '#fffff',
        secondary: {
            main: '#0fc7d5'
        },
        grey: {
            main: '#efefef'
        }
    }
});


export default Theme;