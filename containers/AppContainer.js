import React, { Component } from 'react';
import App from '../components/App';

export default class AppContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageName: null,
            pageItems: [],
            loading: true
        }

        this.deletePage = this.deletePage.bind(this);
        this.addPage = this.addPage.bind(this);
        this.selectMenuItem = this.selectMenuItem.bind(this);
    }

    async componentDidMount() {
        try {

            // Use fetch to get pages for menu on component loaded 
            const response = await fetch(window.location.href + 'page/getpages', {
                method: 'GET'
            });

            let pages = await response.json();
            const items = [];

            // Add pages returned from API request
            for (let p of pages) {
                items.unshift({title : p.title, id : p._id});
            }

            this.setState({loading : false,
                pageItems : items});

        } catch (err) {
            console.log('Error: ' + err);
        }
    }

    async addPage(pageName) {

        let addedPage = false;

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
            this.setState({pageItems : [pageName,...this.state.pageItems]});

            addedPage = true;
        }

        return addedPage;

    }

    async deletePage(pageName) {

        // Remove from the server
        const response = await fetch(window.location.href + 'page/removepage/' + pageName, {
            method: 'DELETE'
        });

        // Get index of page
        for (var i = 0; i < this.state.pageItems.length; i++) {
            if (pageName === this.state.pageItems[i].title) {
                break;
            }
        }

        // Remove from menu
        let pageArr = [...this.state.pageItems];
        pageArr.splice(i, 1);

        this.setState({ pageName: null, pageItems : pageArr });
    }

    selectMenuItem(pageName)
    {
        this.setState({ pageName: pageName});
    }    

    render() {

        const {pageName, loading, pageItems} = this.state;

        let main = <div id="appContainer">
            <App deletePage={this.deletePage} pageName={pageName} 
                loading={loading} addPage={this.addPage} pageItems={pageItems} 
                selectMenuItem={this.selectMenuItem}/>                
        </div>;

        return main;
    }
}