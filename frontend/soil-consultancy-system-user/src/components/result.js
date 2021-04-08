import React from "react"
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Card, Divider, Grid} from '@material-ui/core';
import reportService from "../service/reportService";
import Cookies from "js-cookie";
import {Redirect} from "react-router-dom"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GoogleLogout from "react-google-login"

const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textAlign:'left',
    },
    table: {
        width: 1100,
        margin:'auto',
        backgroundColor:"#e8f5e9"
    },
    tablerow:{
        borderColor: "black"
    },
    card:{
        width:420,
        height:220,
        paddingTop:20,
        backgroundColor:"#e8f5e9"
    }
})


class result extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            reports:[],
            loggedOut:false
        }
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

    userlogout = () => {
        Cookies.remove("name");
        Cookies.remove("email");
        this.setState(
          {
            loggedOut:true
          }
        )
      }
    

    render(){
        const {classes} = this.props;
        if(Cookies.get("name")===undefined) return <Redirect to = "/" />
        if(this.state.loggedOut){
            console.log(this.state.loggedOut)
            return(
            <Redirect to = "/" />
            );
          }
        return(
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}> Soil Consultancy System</Typography>
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
                <div> 
                <Typography variant="h5" style={{marginTop:100}}><b>Consultancy Report</b></Typography>
                <Paper style={{width:1150,margin:'auto',marginTop:20,backgroundColor:"#c8e6c9"}}>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow classname={classes.tablerow}>
                            <TableCell align="center">Crop Type</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Nitrogen</TableCell>
                            <TableCell align="center">Ideal level of Nitrogen</TableCell>
                            <TableCell align="center">Phosphor</TableCell>
                            <TableCell align="center">Ideal level of Phosphor</TableCell>
                            <TableCell align="center">Potassium</TableCell>
                            <TableCell align="center">Ideal level of Potassium</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.reports.map((report) => (
                            <TableRow>
                            <TableCell align="center">{report.crop}</TableCell>
                            <TableCell align="center">{report.date}</TableCell>
                            <TableCell align="center">{report.nitrogen}</TableCell>
                            <TableCell align="center" rowSpan={report.length}>112-228</TableCell>
                            <TableCell align="center">{report.phosphor}</TableCell>
                            <TableCell align="center" rowSpan={report.length}>9-22</TableCell>
                            <TableCell align="center">{report.potassium}</TableCell>
                            <TableCell align="center" rowSpan={report.length}>60-120</TableCell>
                            <TableCell align="center"></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer></Paper>
                </div>    
                <Grid container spacing={6} style={{marginTop:20,marginLeft:70}}>
                    <Grid item>
                        <Card className={classes.card}>
                            <Typography variant="h5" color="primary">Nitrogen<br /><Divider /></Typography>
                            <Typography>Fertilizer to be applied : Urea(46% N) <br />
                                <span style={{color:"red"}}>Deficiency</span>: Amount of fertilizer to be applied: <br />((Ideal+10)*100)/46<br /> 
                                <span style={{color:"green"}}>Ideal</span>: Amount of fertilizer to be applied: <br />((Ideal)*100)/46 <br />
                                <span style={{color:"blue"}}>Over-dose</span>: Amount of fertilizer to be applied: <br />((Ideal-10)*100)/46
                            </Typography>  
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <Typography variant="h5" color="primary">Phosphor<br /><Divider /></Typography>
                                <Typography>Fertilizer to be applied : Single Super Phosphate(16% P)
                                <br /><span style={{color:"red"}}>Deficiency</span>: Amount of fertilizer to be applied: <br />((Ideal+10)*100)/16 <br /> 
                                <span style={{color:"green"}}>Ideal</span>: Amount of fertilizer to be applied: <br />((Ideal)*100)/16 <br />
                                <span style={{color:"blue"}}>Over-dose</span>: Amount of fertilizer to be applied: <br />((Ideal-10)*100)/16
                            </Typography>  
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            <Typography variant="h5" color="primary">Potassium<br /><Divider /></Typography>
                            <Typography>Fertilizer to be applied : Mueriate of Potash(60% K)
                                <br /><span style={{color:"red"}}>Deficiency</span>: Amount of fertilizer to be applied: <br />((Ideal+10)*100)/60 <br />
                                <span style={{color:"green"}}>Ideal</span>: Amount of fertilizer to be applied: <br />((Ideal)*100)/60 <br />
                                <span style={{color:"blue"}}>Over-dose</span>: Amount of fertilizer to be applied: <br />((Ideal-10)*100)/60
                            </Typography>  
                        </Card>
                    </Grid>
                </Grid>    
                </div>
        )
    }
}

export default withStyles(useStyles)(result);