import { React, useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';

const SignUpView = () => {
    const dispatch = useDispatch();

    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const handleSignUp = async () => {
        if (inputs.password !== inputs.confirmPassword) {
            alert("password does not match!");
        }

        let userInfo = {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
            password: inputs.password
        };

        let response = await fetch ("http://localhost:8080/api/v1/registration", {
            method: 'post',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(userInfo)
        });

        let jsonResponse = await response.json();
        if (jsonResponse.message === "SUCCESS") {
            alert("sign up successfully, you can log in");
        } else {
            alert("Wrong user information, Please try again");
        }
    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                    <TextField fullWidth name='firstName' value={inputs.firstName} placeholder="Enter your first name"
                        onChange={handleInputChange}/>
                    <TextField fullWidth name='lastName' value={inputs.lastName} placeholder="Enter your last name"
                        onChange={handleInputChange}/>
                    <TextField fullWidth name='email' value={inputs.email} placeholder="Enter your email"
                        onChange={handleInputChange}/>
                    {/* <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl> */}
                    {/* <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" /> */}
                    <TextField fullWidth name='password' value={inputs.password} placeholder="Enter your password"
                        onChange={handleInputChange}/>
                    <TextField fullWidth name='confirmPassword' value={inputs.confirmPassword} placeholder="Confirm your password"
                        onChange={handleInputChange}/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit'
                        variant='contained' 
                        color='primary'
                        onClick={handleSignUp}>
                        Sign up
                    </Button>
            </Paper>
        </Grid>
    )
}

export default SignUpView;