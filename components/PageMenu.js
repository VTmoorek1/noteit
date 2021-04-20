import React, { Component } from 'react';
import GeneralDialog from './GeneralDialog';
import PageMenuItem from './PageMenuItem';
import PropTypes from 'prop-types';
import '../stylesheets/pagemenu.css';

/**
 * Page Menu will load page items and selected page. Future enhancement.
 */
export default class PageMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
            showErrorDialog : false,
            menuOptions : null,
            deleteDialog : null
        };

        this.addPageClick = this.addPageClick.bind(this);
        this.okAddPage = this.okAddPage.bind(this);
        this.cancelAddPage = this.cancelAddPage.bind(this);
        this.closeErrorPage = this.closeErrorPage.bind(this);
        this.selectedPageMenuItem = this.selectedPageMenuItem.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.deletePage = this.deletePage.bind(this);
        this.handleGlobalClick = this.handleGlobalClick.bind(this);
    }

    closeDeleteDialog()
    {
        this.setState({deleteDialog : null});
    }

    deletePage(pageName)
    {
        this.props.deletePageEvent(pageName);

        this.setState({deleteDialog : null, selectedMenuItem : null });
    }

    selectedPageMenuItem(e) {

        // Reload on any click
        let pageName = e.target.value;

        this.props.selectMenuItem(pageName);
        
        if (e.type === 'contextmenu')
        {
            // Show menu options ex. delete
            e.preventDefault();
            this.setState({menuOptions : <div ref={(node) => this.node=node} className="menuOptionsDiv" 
                style={{left : e.clientX, top : (e.clientY-10)}}>
                <button onClick={()=>this.deleteClick(pageName)} 
                className="btn btn-danger circleButtons"  id="deletePageBtn" type="button">
                    <i className="fa fa-times"></i></button></div>});
        }
    }

    deleteClick(pageName) {
        this.setState({menuOptions : null,deleteDialog : <GeneralDialog message={`Are you sure to delete ${pageName}?`} 
            okAction={()=>this.deletePage(pageName)} cancelAction={this.closeDeleteDialog} />});
    }

    addPageClick() {
        this.setState({ showDialog: true });
    }

    closeErrorPage () {
        this.setState({showErrorDialog: false});
    }

    async okAddPage(pageName) {

        const addedPage = await this.props.addPage(pageName);

        if (addedPage) {
            this.setState({ showDialog: false });
        }
        else
        {
            this.setState({showErrorDialog : true});
        }

    }

    cancelAddPage() {
        this.setState({ showDialog: false });
    }
    
    componentDidMount() {
        document.addEventListener('mousedown',this.handleGlobalClick,false);
    }

    componentWillUnmount()
    {
        document.removeEventListener('mousedown',this.handleGlobalClick,false);
    }

    handleGlobalClick(e) {
        if (this.node && !this.node.contains(e.target))
        {
            this.setState({menuOptions : null});
        }   
    }

    render() {

        return <div id="pageMenu" className="bg-dark">
            <table id="pageTable">
                <tbody>
                    <tr id="pageTableHeaderRow">
                        <td id="pageTableHeaderCell"><button id="addPageBtn" type="button" onClick={this.addPageClick}
                            className="btn btn-primary"><i className="fa fa-plus"></i></button></td>
                    </tr>
                    {this.props.pageItems.map(item => { 
                        const sel = this.props.pageName === item.title;
                        return <PageMenuItem key={"PMI"+item.id} title={item.title} id={item.id} selected={sel} 
                            selectedAction={this.selectedPageMenuItem} /> })}
                </tbody>
            </table>
            {this.state.showDialog && <GeneralDialog textBox={true} message="Enter Page Name:" okAction={this.okAddPage} cancelAction={this.cancelAddPage} />}
            {this.state.showErrorDialog && <GeneralDialog textBox={false} message="Page Already Exists!" cancelAction={this.closeErrorPage} />}
            {this.state.menuOptions}
            {this.state.deleteDialog}
        </div>;
    }

}

PageMenu.propTypes = {
    deletePageEvent : PropTypes.func.isRequired,
    pageName : PropTypes.string,
    pageItems : PropTypes.arrayOf(PropTypes.object).isRequired,
    addPage : PropTypes.func.isRequired,
    selectMenuItem : PropTypes.func.isRequired,
    deletePageEvent : PropTypes.func.isRequired
};