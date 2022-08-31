import { React, useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useDispatch, useSelector} from "react-redux"
import { setUserName } from '../../stateSlices/userSlice';

const LoginView = ({handleChange}) => {
    const dispatch = useDispatch();

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={margin:'8px 0'};

    const [inputs, setInputs] = useState({
        userName:'',
        password:'',
    });

    const handleInputChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const handleLogin = async () => {
        var url = new URL("http://localhost:8080/login");
        const params = {"username": inputs.userName, "password": inputs.password};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        let response = await fetch (url, {
            method: 'post'
        });
        let jsonResponse = await response.json();
        if (jsonResponse.Message === "SUCCESS") {
            dispatch(setUserName(inputs.userName));
        } else {
            alert("Wrong user information, Please try again or sign up");
        }
    }

    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField name='userName' placeholder='Enter username' fullWidth required
                        value={inputs.userName} onChange={handleInputChange}/>
                <TextField name='password' placeholder='Enter password' type='password' fullWidth required
                        value={inputs.password} onChange={handleInputChange}/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    onClick={handleLogin}
                    fullWidth
                    >Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" onClick={()=>handleChange("event",1)} >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default LoginView