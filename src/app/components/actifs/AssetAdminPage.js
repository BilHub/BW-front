import React, {Component} from 'react';
import {assetlist_url} from "../../utils/constants"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Link} from "react-router-dom";
import {withTranslation} from 'react-i18next';
import http from "../../http";
import filterFactory, { textFilter, selectFilter } from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {CSVLink} from "react-csv";


const options = {
    sizePerPage: 10,
    page: 1,
    alwaysShowAllBtns: false,
    hideSizePerPage: true,
    sizePerPageList: [10, 20, 30]
}

function actionsFormatterImportance(cell, row, rowIndex, formatExtraData) {
    return (
        <div>
            {row.importance == "Critique" ?
                <label className="badge badge-critique"> {row.importance}</label>
                :
                row.importance == "Important" ?
                    <label className="badge badge-majeur"> {row.importance}</label>
                    :
                    row.importance == "Majeur" ?
                        <label className="badge badge-important"> {row.importance}</label>
                        :
                        <label className="badge badge-mineur"> {row.importance}</label>
            }
        </div>
    );
}

function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        < div
              style={{
                  textAlign: "left",
                  cursor: "pointer",
                  lineHeight: "normal"
              }}>

            <Link to={`actif-modif/${row.asset_ref}`}>
                <i className="mdi mdi-table-edit"></i>
            </Link>
            &nbsp;


        </div>
    );
}


function actionsFormatterId(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            <a href={`actif-detail/${row.asset_ref}`}>
                <span> {row.id} </span>
            </a>
        </div>
    );
}
const optionsFilter = {
  'Mineur': 'Mineur',
  'Important': 'Important',
  'Majeur': 'Majeur',
  'Critique': 'Critique'
};
class AssetAdmin extends Component {
    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            assets: [],
            filtered: [],
            isOpen: false,
            role: '',
            searchInpout: '',
            filter: {},
            columns: [
                {
                    dataField: "id",
                    text: "ID",
                    sort: true,
                    formatter: actionsFormatterId,
                },
                {
                    dataField: "asset_ref",
                    text: t("Nom"),
                    sort: true,
                    filter: textFilter({placeholder: t('Nom') }),

                },
                {
                    dataField: "responsable",
                    text: t("Responsable"),
                    sort: true,

                     filter: textFilter({placeholder: t('Responsable') }),

                },
                {
                    dataField: "service",
                    text: t("Service"),
                    sort: true,
                     filter: textFilter({placeholder: t('Service') }),
                },
                {
                    dataField: "importance",
                    text: t("Criticité"),
                    sort: true,
                    formatter: actionsFormatterImportance,
                    filter: selectFilter({
                                options: optionsFilter,
                             })
                },

                {
                    dataField: 'actions',
                    text: t('Actions'),
                    isDummyField: true,
                    csvExport: false,
                    formatter: actionsFormatter,
                },
            ],

                 headers: [{label: "id", key: "id"},

                {label: "asset_ref", key: "asset_ref"},
                {label: "service", key: "service"},
                {label: "responsable", key: "responsable"},
                {label: "criticité", key: "importance"},



            ]
        }
        this.togglePopup = this.togglePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    togglePopup() {

        this.setState({
            isOpen: !this.isOpen
        });

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

        http.get(assetlist_url)
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
                            <li className="breadcrumb-item"><a href="/actifs-liste"
                                                               onClick={event => event.preventDefault()}>{t('Actifs')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Liste des actifs')}</li>
                        </ol>
                    </nav>
                </div>
                <div>

                    <br/> <br/>
                    <Link to="/add-produit">
                        <button type="button" className="btn btn-gradient-dark btn-rounded btn-icon mb-3 mr-3"
                                title={t('Ajouter produit')}>
                            <i className="mdi mdi-database-plus"> </i>
                        </button>
                    </Link>
                    <Link to="/add-actif">
                        <button type="button" className="btn btn-gradient-secondary btn-rounded btn-icon  mb-3"
                                title={t('Ajouter actif')}>
                            <i className="mdi mdi-database-plus"></i>
                        </button>
                    </Link>
                       <Link to="/import-assets">
                        <button type="button" className="btn btn-gradient-dark btn-rounded btn-icon mb-3 mr-3"
                                title={t('Importer actifs')}>
                            <i className="mdi mdi-upload"> </i>
                        </button>
                    </Link>
                     <button type="button" className="btn btn-gradient-dark btn-rounded btn-icon" style={{float: 'right'}}
                        title="csv">
                    <CSVLink data={this.state.assets} headers={this.state.headers}
                             filename={"assets_list.csv"}>

                        <i className="mdi mdi-folder-download" style={{color: 'white'}}></i>
                    </CSVLink>
                </button>

                </div>
                <div className="row">
                    <div className="col grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">

                                {this.state.assets ?
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

                                           filter={ filterFactory() }
                                            onFilterChange={this.handleFilterChange}

                                        />
                                    </table>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(AssetAdmin);