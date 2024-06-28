import React, {Component} from "react";
import {withTranslation} from 'react-i18next';


export class CancelButton extends Component {
    constructor(props){
        super(props);
        const {t} = this.props;

        this.state = {
            url: this.props.url,
        }
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel(e) {
        e.preventDefault();
        window.location = this.state.url
    }
    render() {
        const {t} = this.props;
        return (
            <button className="btn btn-light" onClick={this.handleCancel}>{t('Annuler')}</button>
        )
    }
}
export default withTranslation()(CancelButton)
