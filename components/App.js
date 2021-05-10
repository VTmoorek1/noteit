import React, { Component } from 'react';
import PageContainer from '../containers/PageContainer';
import PageMenu from './PageMenu';
import Spinner from './Spinner';
import '../stylesheets/main.css';
import PropTypes from 'prop-types';
import HeadMenuContainer from '../containers/HeadMenuContainer';

export default class App extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {

        const {pageName, deletePage, addPage, selectMenuItem, loading, pageItems} = this.props;

        {/* Use bootstrap for 3 columns, first column to be Page menu,
            second column to be the media page, third column is spacing */}
        let main = <div id="mainApp">
            <HeadMenuContainer />
            <div id="pageMenuDiv">
                {
                    <PageMenu pageItems={pageItems}  deletePageEvent={deletePage} 
                        addPage={addPage} selectMenuItem={selectMenuItem} pageName={pageName} />
                }
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-11">
                        {pageName && <PageContainer pageName={pageName} /> }
                    </div>
                    <div className="col-1">
                    </div>
                </div>
            </div>

            {loading && <Spinner />}
                
        </div>;

        return main;
    }
}

App.propTypes = {
    pageName : PropTypes.string,
    deletePage : PropTypes.func.isRequired,
    selectMenuItem : PropTypes.func.isRequired,
    addPage : PropTypes.func.isRequired,
    loading : PropTypes.bool.isRequired,
    pageItems : PropTypes.arrayOf(PropTypes.object).isRequired
}