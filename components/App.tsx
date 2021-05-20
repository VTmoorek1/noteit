import React, { Component } from 'react';
import PageContainer from '../containers/PageContainer';
import PageMenu from './PageMenu';
import Spinner from './Spinner';
import '../stylesheets/main.css';
import {PageItem} from '../interfaces/pageinterface'; 
import HeadMenuContainer from '../containers/HeadMenuContainer';


interface Props
{
    pageName : (string | null),
    deletePage : (p1 : string) => void,
    selectMenuItem : (p1 : string) => void,
    addPage : (p1 : string) => Promise<string>,
    loading : boolean,
    pageItems : PageItem[]
}

export default class App extends Component<Props> {

    constructor(props : Props) {
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
