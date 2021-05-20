import React, { Component } from 'react';
import '../stylesheets/pagemenuitem.css';


interface Props {
    title: string,
    id: string,
    selected: boolean,
    selectedAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

/**
 * Each item in the page menu
 */
export default class PageMenuItem extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.onAnyClick = this.onAnyClick.bind(this);

    }

    onAnyClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.props.selectedAction(e);
    }

    render() {

        const { selected, id, title } = this.props;
        let style = selected ? "btn btn-primary pageCellSelected" : "btn btn-primary pageCellBtn";

        return <tr key={id}><td><button value={title} onClick={this.onAnyClick} type="button"
            onContextMenu={this.onAnyClick} className={style}>{title}</button></td></tr>;
    }

}
