import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProtectedRouted from './ProtectedRouted';
import { AuthProvider } from './shared/context/AuthProvider';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route exact path='/login'>
                        <Login />
                    </Route>
                    <Route exact path='/signup'>
                        <Register />
                    </Route>
                    <Route path={ProtectedRouted.routes} component={ProtectedRouted} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
