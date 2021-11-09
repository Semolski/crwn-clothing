import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from "./redux/user/user.actions";

import { selectCollectionsForPreview} from "./redux/shop/shop.selectors";

const App = ({checkUserSession, currentUser}) => {
    useEffect(() => {
        checkUserSession()
    }, [checkUserSession])
    // We only want to invoke checkUserSession the first time when we pass it in and not fire when
    // currentUser updates, so we pass into the dependency array passing checkUserSession.
    // We do this because checkUserSession is a property function that is being passed in from
    // mapDispatchToProps. If this was a property being passed in from a parent we would do
    // something different.
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route exact path='/checkout' component={CheckoutPage} />
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            currentUser ? (
                                <Redirect to='/' />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);