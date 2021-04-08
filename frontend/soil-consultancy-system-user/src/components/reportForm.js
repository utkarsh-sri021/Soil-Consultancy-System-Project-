import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import reportService from '../service/reportService'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Redirect } from 'react-router-dom';
import { Card, Grid, MenuItem } from '@material-ui/core';
import { GoogleLogout } from "react-google-login";
import Cookies from "js-cookie"

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textAlign:'left',
    },
    card1:{
      backgroundColor: "#e8f5e9",
      color:"white",
      width:600,
      height:450,
    },
    card3:{
      backgroundColor: "#e8f5e9",
      width:600,
      height:120,
    },
    link:{
      color:"#ffffff"
    }
  });

const Crop =[
  {
    value:"Sugarcane",
    label:"Sugarcane"
  },
  {
    value:"Paddy",
    label:"Paddy"
  },
  {
    value:"Maize",
    label:"Maize"
  },
  {
    value:"Tomato",
    label:"Tomato"
  },
  {
    value:"Ragi",
    label:"Ragi"
  }
]

class reportForm extends React.Component{

    constructor(props){
      super(props);
      this.state ={
        reports:[],
        open_error_form: false,
        nitrogen : null,
        phosphor: null,
        potassium: null,
        calcium : null,
        magnesium:null,
        sulphur:null,
        iron:null,
        zinc:null,
        manganese:null,
        copper:null,
        molybdenum:null,
        boron:null,
        chlorine:null,
        nickel:null,
        crop:"",
        date:null,
        email:Cookies.get("email"),
        loggedOut:false,
      };
    }
    

  componentDidMount(){
    this.retrieveAllReport();
  }

  retrieveAllReport() {
    reportService.retrieveAllReport().then((response) => {
      console.log(response);
      this.setState({reports: response.data})
    })
  }



    openErrorForm = (e) => {
      this.setState({
        open_error_form: true,
      });
    };

    handleClose = () => {
      this.setState({ open_error_form: false });
    };

    handleChange = (name) => (event) => {
      this.setState({
        [name]: event.target.value,
      });
    }

    userlogout = () => {
      Cookies.remove("name");
      Cookies.remove("email");
      this.setState({
        loggedOut:true
      })
    }

    handleSubmit = () => {
      if(
        this.state.nitrogen === null ||
        this.state.phosphor === null ||
        this.state.potassium === null ||
        this.state.calcium === null ||
        this.state.magnesium === null ||
        this.state.sulphur === null ||
        this.state.iron === null ||
        this.state.zinc === null ||
        this.state.manganese === null ||
        this.state.copper === null ||
        this.state.molybdenum === null ||
        this.state.boron === null ||
        this.state.chlorine === null ||
        this.state.nickel === null ||
        this.state.date === null ||
        this.state.crop === ""
      )
        {
          this.openErrorForm();
        }
      else{
        var report ={
          nitrogen:this.state.nitrogen,
          phosphor:this.state.phosphor,
          potassium:this.state.potassium,
          calcium:this.state.calcium,
          magnesium:this.state.magnesium,
          sulphur:this.state.sulphur,
          iron:this.state.iron,
          zinc:this.state.zinc,
          manganese:this.state.manganese,
          copper:this.state.copper,
          molybdenum:this.state.molybdenum,
          boron:this.state.boron,
          chlorine:this.state.chlorine,
          nickel:this.state.nickel,
          date:this.state.date,
          crop:this.state.crop,
          email:this.state.email

        };
      console.log(report);
    
      reportService.createReport(report).then((response) => {
        
        this.retrieveAllReport();
      })

      }  
    }
    render(){
        const { classes } = this.props;
        const user_name = Cookies.get("name");
        if(Cookies.get("name")===undefined) return <Redirect to = "/" />
        if(this.state.loggedOut){
          console.log(this.state.loggedOut)
          return(
          <Redirect to = "/" />
          );
        }
        return(
            <div className = {classes.formPage,classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}> Soil Consultancy System</Typography>
                        <Button variant="contained" color="secondary" style={{marginRight:5}} href="/result"> Existing Reports</Button>
                        <GoogleLogout 
                        className="google-logout-button"
                        clientId="402744950664-cefekape7t5m71d9ok33fun1pg5hgdb7.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={this.userlogout}
                        onFailure={this.responseGoogle}
                        isSignedIn={false}
                        cookiePolicy={"single_host_origin"} /> 
                    </Toolbar>
                </AppBar>
                <Typography variant="h4" style={{marginTop:20}}>WELCOME {user_name}</Typography>
                <Typography variant="h4" style={{marginTop:20}}>REPORT DETAILS</Typography>
                <Typography variant="subtitle1">Please enter the report details below</Typography>
                <ValidatorForm autoComplete="off" style={{marginTop:20}} onSubmit={this.handleSubmit}>
                <Grid container spacing={10} style={{marginLeft:"5%"}}>
                 <Grid item>
                   <Card className={classes.card3}>
                   <Typography variant="h6" style={{align:"center",color:"black",marginTop:5}}>CROP TYPE</Typography>
                    <TextValidator
                    style={{width:500}}
                    select
                    label="Crop Type"
                    onChange={this.handleChange("crop")}
                    value={this.state.crop}
                    >
                       {Crop.map((option) => (
                         <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                       ))}
                     </TextValidator>
                    </Card></Grid>
                    <Grid item>
                   <Card className={classes.card3}>
                   <Typography variant="h6" style={{align:"center",color:"black",marginTop:5}}>DATE</Typography>
                     <TextValidator
                      style={{ width: 500 }}
                      label="DATE"
                      type="date"
                      defaultValue="2001-01-01"
                      onChange={this.handleChange("date")}
                      value={this.state.date}
                        />
                   </Card>
                 </Grid>
               </Grid>
                <Grid container spacing={10} style={{marginLeft:"5%"}}>
                  <Grid item>
                    <Card className={classes.card1} >
                        <Typography variant="h6" style={{color:"black",marginTop:40}}>PRIMARY NUTRIENTS</Typography>
                        <TextValidator
                        style={{ width: 500 }}
                        label="Nitrogen(kg/acre)"
                        onChange={this.handleChange("nitrogen")}
                        value={this.state.nitrogen}
                        />
                        <TextValidator
                        style={{ width: 500 }}
                        label="Phosphor(kg/acre)"
                        onChange={this.handleChange("phosphor")}
                        value={this.state.phosphor}
                        /> 
                          <TextValidator
                        style={{ width: 500 }}
                        label="Potassium(kg/acre)"
                        onChange={this.handleChange("potassium")}
                        value={this.state.potassium}
                        /> 
                        <Typography variant="h6" style={{color:"black",marginTop:5}}>SECONDARY NUTRIENTS</Typography>
                        <TextValidator
                        style={{ width: 500 }}
                        label="Calcium(ppm)"
                        onChange={this.handleChange("calcium")}
                        value={this.state.calcium}
                        /> 
                          <TextValidator
                        style={{ width: 500 }}
                        label="Magnesium(ppm)"
                        onChange={this.handleChange("magnesium")}
                        value={this.state.magnesium}
                        /> 
                          <TextValidator
                        style={{ width: 500 }}
                        label="Sulphur(ppm)"
                        onChange={this.handleChange("sulphur")}
                        value={this.state.sulphur}
                        /> 
                    </Card></Grid>
                    <Grid item><Card className={classes.card1}>
                    <Typography variant="h6" style={{color:"black",marginTop:5}}>MICRO-NUTRIENTS</Typography>
                    <TextValidator
                    style={{ width: 500 }}
                    label="Iron(ppm)"
                    onChange={this.handleChange("iron")}
                    value={this.state.iron}
                    /> 
                    <TextValidator
                    style={{ width: 500 }}
                    label="Zinc(ppm)"
                    onChange={this.handleChange("zinc")}
                    value={this.state.zinc}
                    /> 
                      <TextValidator
                    style={{ width: 500 }}
                    label="Manganese(ppm)"
                    onChange={this.handleChange("manganese")}
                    value={this.state.manganese}
                    /> 
                    <TextValidator
                    style={{ width: 500 }}
                    label="Copper(ppm)"
                    onChange={this.handleChange("copper")}
                    value={this.state.copper}
                    /> 
                    <TextValidator
                    style={{ width: 500 }}
                    label="Molybdenum(ppm)"
                    onChange={this.handleChange("molybdenum")}
                    value={this.state.molybdenum}
                    /> 
                      <TextValidator
                    style={{ width: 500 }}
                    label="Boron(ppm)"
                    onChange={this.handleChange("boron")}
                    value={this.state.boron}
                    /> 
                    <TextValidator
                    style={{ width: 500 }}
                    label="Chlorine(ppm)"
                    onChange={this.handleChange("chlorine")}
                    value={this.state.chlorine}
                    /> 
                    <TextValidator
                    style={{ width: 500 }}
                    label="Nickel(ppm)"
                    onChange={this.handleChange("nickel")}
                    value={this.state.nickel}
                    />
                        
                    </Card></Grid>
               </Grid>
               
                <Button variant="contained" color="primary" type="submit" style={{marginTop:10}}>Confirm</Button>
                </ValidatorForm>
              
              <Button variant="contained" color="secondary" href="/result" style={{marginTop:10}}>Let's find out</Button>
                <Dialog
                    open={this.state.open_error_form}
                    TransitionComponent={Transition}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                 >
                    <DialogTitle id="alert-dialog-slide-title">
                        <span
                          style={{
                            fontFamily: "HelveticaforTargetBold,Arial",
                            color: "#646566",
                            fontWeight: "bolder",
                          }}
                        >
                          All fields are required!
                        </span>
                    </DialogTitle>
                   <DialogActions>
                    <Button
                      onClick={() => {
                        this.setState({ open_error_form: false })  
                      }}
                      
                      variant="outlined"
                      className="submit"
                      
                    >
                Okay
              </Button>
            </DialogActions>
          </Dialog>
            </div>

        );
    }
}

export default withStyles(useStyles)(reportForm);