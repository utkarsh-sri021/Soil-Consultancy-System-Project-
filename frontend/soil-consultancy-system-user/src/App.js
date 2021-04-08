import React from 'react'
import {Route,BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Home from './components/Home.js'
import reportForm from './components/reportForm';
import result from './components/result'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main:"#66bb6a"},
    secondary:{
      main:"#ffecb3"
    }
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/reportForm" component={reportForm} />
        <Route path="/result" component={result} />
      </Router>
    </div></ThemeProvider>
  );
}

export default App;
