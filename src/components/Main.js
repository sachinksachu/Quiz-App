import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Header from "./Header";
import Home from "./Home";
import QuizTemplate from "./QuizTemplate";
import Result from "./Result";

const Main = () =>{
    return(
        <div>
            <Header/>
            <Switch>
                <Route exact path="/home" component={Home}/>
                <Route path="/quiz" render={(props) => <QuizTemplate {...props} />}/>
                <Route path="/result" render={(props) => <Result {...props} />}/>
                <Redirect to="/home"/>

            </Switch>
        </div>
    )
}

export default withRouter(Main);