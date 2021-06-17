import React, { Component } from 'react';
import App from '../components/App';
import * as AppActions from '../redux/actions/appActions';
import { fetchInitialState } from '../redux/actions/authActions';
import {connect} from 'react-redux';
import { PageItem } from '../interfaces/pageinterface';
import { MainState } from '../redux/reducers/index'
import { ThunkDispatch } from 'redux-thunk';

interface ACProps {
    loggedOn : (string | null),
    pageItems : PageItem[]
    loading : boolean,
    notesLoading : boolean, 
    pageName : (string | null),
    fetchPages : () => void,
    fetchInitialState : () => void,
    addPage : (pageName : string) => Promise<boolean>
    deletePage : (pageName : string) => void 
    selectPage : (pageName : string) => void 
}

class AppContainer extends Component<ACProps> {

    constructor(props : ACProps) {
        super(props);

        this.deletePage = this.deletePage.bind(this);
        this.addPage = this.addPage.bind(this);
        this.selectMenuItem = this.selectMenuItem.bind(this);
    }

    componentDidUpdate(prevProps : ACProps)
    {
        if (this.props.loggedOn !== prevProps.loggedOn)
        {
            if (this.props.loggedOn)
            {
                this.props.fetchPages();
            }
        }
    }

    componentDidMount() {

        this.props.fetchInitialState();        
    }

    async addPage(pageName : string)
    {
        return await this.props.addPage(pageName);
    }

    deletePage(pageName : string) {
        this.props.deletePage(pageName);        
    }

    selectMenuItem(pageName : string)
    {
        this.props.selectPage(pageName);
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

const mapStateToProps = (state : MainState) => ({
    pageName : state.app.pageName,
    pageItems : state.app.pageItems,
    loading : state.app.loading,
    notesLoading : state.note.loading,
    loggedOn : state.app.loggedOn
});

const mapDispatchToProps = (dispatch : ThunkDispatch<MainState,void,AppActions.AppAction>) => (
    {
        fetchPages : () => dispatch(AppActions.fetchPages()),
        fetchInitialState : () => dispatch(fetchInitialState()),
        addPage : (pageName : string) : Promise<boolean> => dispatch(AppActions.addPage(pageName)),
        deletePage : (pageName : string) => dispatch(AppActions.deletePage(pageName)),
        selectPage : (pageName : string) => dispatch(AppActions.selectPage(pageName))
    }
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);