import React, { Component } from 'react';
import GeneralDialog from './GeneralDialog';
import PageMenuItem from './PageMenuItem';
import PropTypes from 'prop-types';

/**
 * Page Menu will load page items and selected page. Future enhancement.
 */
export default class PageMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageItems: [],
            showDialog: false,
            showErrorDialog : false,
            menuOptions : null,
            deleteDialog : null,
            selectedMenuItem : null
        };

        this.addPageItem = this.addPageItem.bind(this);
        this.addPageClick = this.addPageClick.bind(this);
        this.okAddPage = this.okAddPage.bind(this);
        this.cancelAddPage = this.cancelAddPage.bind(this);
        this.closeErrorPage = this.closeErrorPage.bind(this);
        this.selectedPageMenuItem = this.selectedPageMenuItem.bind(this);
        this.reloadPageItems = this.reloadPageItems.bind(this);
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
        console.log('--------delete page ' + pageName);
        this.props.deletePageEvent(pageName);

        // Get index of page
        for (var i = 0; i < this.state.pageItems.length; i++) {
            if (pageName === this.state.pageItems[i].props.title) {
                break;
            }
        }

        // Remove from menu
        let pageArr = [...this.state.pageItems];
        pageArr.splice(i, 1);
        this.setState({ pageItems : pageArr, deleteDialog : null, selectedMenuItem : null });
    }

    selectedPageMenuItem(e) {
        console.log("selected " + e.target.value);
        console.log("type " + e.type);

        // Reload on any click
        let pageName = e.target.value;

        this.reloadPageItems(pageName);
        
        if (e.type === 'contextmenu')
        {
            // Show menu options ex. delete
            e.preventDefault();
            this.setState({menuOptions : <div ref={(node) => this.node=node} className="menuOptionsDiv" 
                style={{left : e.clientX, top : (e.clientY-10)}}>
                <button onClick={()=>this.deleteClick(pageName)} 
                className="btn btn-danger circleButtons"  id="deletePageBtn" type="button">
                    <i className="fa fa-times"></i></button></div>});
            console.log("x: " + e.clientX + "y: " + e.clientY);
        }
    }

    deleteClick(pageName) {
        this.setState({menuOptions : null,deleteDialog : <GeneralDialog message={`Are you sure to delete ${pageName}?`} 
            okAction={()=>this.deletePage(pageName)} cancelAction={this.closeDeleteDialog} />});
    }

    reloadPageItems(pageItemName)
    {
        this.props.selectedEvent(pageItemName);

        let newItems = [];

        // Clear all menu items of selected state
        for (let item of this.state.pageItems)
        {
            let sel = (pageItemName === item.props.title);

            newItems.push(<PageMenuItem key={"PMI"+item.props.id} title={item.props.title} 
                id={item.props.id} selected={sel} selectedAction={this.selectedPageMenuItem} />);
        }

        console.log(newItems);

        this.setState({pageItems : newItems, selectedMenuItem : pageItemName});
    }

    addPageItem(title, id) {
        this.setState({
            pageItems: [<PageMenuItem key={"PMI"+id} title={title} id={id} selected={false} selectedAction={this.selectedPageMenuItem}  />,
            ...this.state.pageItems]
        });
    }

    addPageClick() {
        this.setState({ showDialog: true });
    }

    closeErrorPage () {
        this.setState({showErrorDialog: false});
    }

    async okAddPage(pageName) {

        // Check first to see if page exists
        const pageRes = await fetch(window.location.href + "page/findpage/" + pageName, {
            method: 'GET'
        });

        let pageObj = await pageRes.json();

        if (!pageObj.exists) {

            // Add page on server
            const response = await fetch(window.location.href + "page/addpage/" + pageName, {
                method: 'POST'
            });

            let id = await response.text();

            // Add to GUI
            this.addPageItem(pageName, id);
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

    async componentDidMount() {
        try {
            console.log('Calling get page items...');
            document.addEventListener('mousedown',this.handleGlobalClick,false);

            // Use fetch to get pages for menu on component loaded 
            const response = await fetch(window.location.href + 'page/getpages', {
                method: 'GET'
            });

            let pages = await response.json();

            // Add pages returned from API request
            for (let p of pages) {
                this.addPageItem(p.title, p._id);
            }

            this.props.pageLoad();

        } catch (err) {
            console.log('Error: ' + err);
        }
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
                    {this.state.pageItems}
                </tbody>
            </table>
            {this.state.showDialog && <GeneralDialog textBox={true} message="Enter Page Name:" okAction={this.okAddPage} cancelAction={this.cancelAddPage} />}
            {this.state.showErrorDialog && <GeneralDialog textBox={false} message="Page Already Exists!" cancelAction={this.closeErrorPage} />}
            {this.state.menuOptions}
            {this.state.deleteDialog}
        </div>;
    }

}