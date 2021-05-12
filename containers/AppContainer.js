import React, { Component } from 'react';
import App from '../components/App';
import * as appActions from '../redux/actions/appActions';
import {connect} from 'react-redux';

class AppContainer extends Component {

    constructor(props) {
        super(props);

        this.deletePage = this.deletePage.bind(this);
        this.addPage = this.addPage.bind(this);
        this.selectMenuItem = this.selectMenuItem.bind(this);
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.loggedOn !== prevProps.loggedOn)
        {
            if (this.props.loggedOn)
            {
                this.props.dispatch(appActions.fetchPages());
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(appActions.fetchInitialState());        
    }

    async addPage(pageName)
    {
        return await this.props.dispatch(appActions.addPage(pageName));
    }

    deletePage(pageName) {
        this.props.dispatch(appActions.deletePage(pageName));
    }

    selectMenuItem(pageName)
    {
        this.props.dispatch(appActions.selectPage(pageName));
    }    

    render() {

        const {pageItems, loading, notesLoading, pageName} = this.props;
        const totalLoading = loading || notesLoading;

        let main = <div id="appContainer">
            <App deletePage={this.deletePage} pageName={pageName} 
                loading={totalLoading} addPage={this.addPage} pageItems={pageItems} 
                selectMenuItem={this.selectMenuItem}/>                
        </div>;

        return main;
    }
}

export default connect(store => ({
    pageName : store.app.pageName,
    pageItems : store.app.pageItems,
    loading : store.app.loading,
    notesLoading : store.note.loading,
    loggedOn : store.app.loggedOn
}))(AppContainer);