import React, {Component} from 'react';
import {actifs_team_get} from "../../utils/constants"
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {withTranslation} from 'react-i18next';
import http from "../../http";

const options = {


    sizePerPage: 10,
    page: 1,
    alwaysShowAllBtns: false,
    hideSizePerPage: true,
    sizePerPageList: [10, 20, 30]

}

function actionsFormatterImportance(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div className="ml-5"
              style={{
                  textAlign: "left",
                  color: 'black',
                  lineHeight: "normal"
              }}>
            {row.importance}


        </div>
    );
}

function actionsFormatterService(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div className="ml-3"
              style={{
                  textAlign: "left",
                  color: 'black',
                  lineHeight: "normal"
              }}>
            {row.service}


        </div>
    );
}

function actionsFormatterAsset(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div className="ml-3"
              style={{
                  textAlign: "left",
                  color: 'black',
                  lineHeight: "normal"
              }}>
            {row.asset_ref}


        </div>
    );
}

class AssetPage extends Component {
    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            assets: [],
            isOpen: false,
            role: '',
            filtered: [],
            columns: [
                {
                    dataField: "asset_ref",
                    text: t("Actif"),
                    sort: true,
                    formatter: actionsFormatterAsset

                },

                {
                    dataField: "service",
                    text: t("Service"),
                    sort: true,
                    formatter: actionsFormatterService

                },
                {
                    dataField: "importance",
                    text: t("Criticité"),
                    sort: true,
                    formatter: actionsFormatterImportance

                },


            ]

        }
        this.togglePopup = this.togglePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    togglePopup() {

        this.setState({
            isOpen: !this.isOpen
        });
        console.log('is OPen', this.isOpen)
    }

    handleChange(e) {

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.assets;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.asset_ref.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.assets;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }


    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        const role = user.role
        this.setState({role: role});

        http.get(actifs_team_get)
            .then(res => {
                const assets = res.data;
                this.setState({assets});
                this.setState({filtered: assets});
            })
    }

    render() {
        const {t} = this.props;
        return (
            <div>

                <div className="page-header">
                    <h3 className="page-title"> {t('Liste des actifs')} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="!#"
                                                               onClick={event => event.preventDefault()}>{t('Actifs')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Liste des actifs')}</li>
                        </ol>
                    </nav>
                </div>
                <div>

                    <div className="search-field d-none d-md-block">
                        <form className="d-flex align-items-center h-100"
                              action="frontend/src/app/components/actifs_collab/AssetPage#">
                            <div className="input-group">
                                <div className="input-group-prepend bg-transparent">
                                    <i className="input-group-text border-0 mdi mdi-magnify"></i>
                                </div>
                                <input type="text" className="form-control bg-transparent border-0"
                                       placeholder={t("Rechercher actif")} onChange={this.handleChange}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">


                                <table className="table">
                                    <BootstrapTable
                                        className="bsTable"
                                        striped={true}
                                        hover={true}

                                        keyField="id"
                                        data={this.state.filtered}
                                        columns={this.state.columns}
                                        bordered={false}
                                        pagination={paginationFactory(options)}


                                    />
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(AssetPage);