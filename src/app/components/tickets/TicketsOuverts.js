import React, {Component} from 'react';
import {ticket_api_url} from "../../utils/constants"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Link} from "react-router-dom";
import {MdAssignmentInd} from "react-icons/md";
import {FaTimes} from "react-icons/fa";
import {CSVLink} from "react-csv";
import {withTranslation} from 'react-i18next';
import http from "../../http";



const options = {
    sizePerPage: 10,
    page: 1,
    alwaysShowAllBtns: false,
    hideSizePerPage: true,
    sizePerPageList: [10, 20, 30]
}


function actionsFormatterScore(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            {/* {row.score} */}
            {row.score <= 4 ? <label className="badge badge-success"> Mineur </label> :
                row.score <= 7 ? <label className="badge badge-warning"> Important </label> :
                    row.score <= 8.5 ? <label className="badge badge-majeur"> Majeur </label> :
                        <label className="badge badge-critique"> Critique </label>
            }

        </div>
    );
}

function actionsFormatterCve(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            {row.cve}

        </div>
    );
}

function actionsFormatterService(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            {row.name}

        </div>
    );
}

function actionsFormatterDate(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            {row.created_at}

        </div>
    );
}

function actionsFormatterAsset(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            {row.asset_ref}

        </div>
    );
}

function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        < div>
            <Link to={`modify-ticket/${row.id}`}>
                <i className="mdi mdi-table-edit"></i>
            </Link>
        </div>
    );
}

function actionsFormatter3(cell, row, rowIndex, formatExtraData) {
    return (
        < div>

            {row.status === 0 ? <label className="badge badge-important"> en attente </label> :
                row.status === 1 ? <label className="badge badge-critique"> en traitement </label> :
                    row.status === 2 ? <label className="badge badge-majeur"> traité </label> :
                        row.status === -1 ? <label className="badge badge-mineur"> fermé </label> : null
            }
        </div>
    );
}

function actionsFormatter4(cell, row, rowIndex, formatExtraData) {
    return (
        < div>
            {row.read === 0 ? <FaTimes color="red"/> :
                <i className="mdi mdi-marker-check" style={{color: 'green'}}></i>}
        </div>
    )
}

function actionsFormatter2(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>

            <a href={`ticket-detail/${row.id}`}>
                <span>{row.id}</span>
            </a>
        </div>
    );
}


function responsableFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        < div>
            <a href={`assign-ticket/${row.id}`}><MdAssignmentInd/> </a>
        </div>
    );
}

class TicketsOuverts extends Component {
    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            ticketsOuverts: [],
            filtered: [],
            role: '',
            columns: [
                {
                    dataField: "id",
                    text: "ID",
                    sort: true,
                    formatter: actionsFormatter2,
                    headerStyle: () => {
                        return {textTransform: 'none'};
                    }

                },

                {
                    dataField: "created_at",
                    text: t("Date de création"),
                    sort: true,
                    formatter: actionsFormatterDate,


                },
                {
                    dataField: "asset_ref",
                    text: t("Actif"),
                    sort: true,
                    formatter: actionsFormatterAsset,

                },
                {
                    dataField: "cve",
                    text: t("Vulnérabilité"),
                    sort: true,
                    formatter: actionsFormatterCve,

                },
                {
                    dataField: "score",
                    text: t("Criticité"),
                    sort: true,
                    formatter: actionsFormatterScore,

                },
                {
                    dataField: "status",
                    text: t("Statut"),
                    sort: true,
                    formatter: actionsFormatter3,



                },
                // {
                //     dataField: "read",
                //     text: t("Alerte lue"),
                //     sort: true,
                //     formatter: actionsFormatter4,


                // },
                {
                    dataField: "service",
                    text: t("service"),
                    sort: true,
                    formatter: actionsFormatterService,


                },
                {
                    dataField: 'actions',
                    text: 'Actions',
                    isDummyField: true,
                    csvExport: false,
                    formatter: actionsFormatter,

                },

                {
                    dataField: 'res',
                    text: t('Assigner'),
                    isDummyField: true,
                    csvExport: false,
                    formatter: responsableFormatter,

                },
            ],
            headers: [{label: "id", key: "id"},
                {label: "created_at", key: "created_at"},
                {label: "asset_ref", key: "asset_ref"},
                {label: "id", key: "id"},
                {label: "cve", key: "cve"},
                {label: "score", key: "score"},
                {label: "status", key: "status"},
                {label: "read", key: "read"},

            ]

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeVul = this.handleChangeVul.bind(this);
        this.handleChangeService = this.handleChangeService.bind(this);
    }


    handleChange(e) {

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.ticketsOuverts;

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
            newList = this.state.ticketsOuverts;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }

    handleChangeVul(e) {

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.ticketsOuverts;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.description.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
            if (newList.length === 0) {
                newList = currentList.filter(item => {
                    // change current item to lowercase
                    const lc = item.cve.toLowerCase();
                    // change search term to lowercase
                    const filter = e.target.value.toLowerCase();
                    // check to see if the current list item includes the search term
                    // If it does, it will be added to newList. Using lowercase eliminates
                    // issues with capitalization in search terms and search content
                    return lc.includes(filter);
                });
            }
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.ticketsOuverts;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }

    handleChangeService(e) {

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.ticketsOuverts;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.name.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.ticketsOuverts;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }


    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({role: user.role});

        http.get(ticket_api_url)
            .then(res => {
                const ticketsOuverts = res.data;
                console.log("tickets list: !!!", ticketsOuverts)
                this.setState({ticketsOuverts});
                this.setState({filtered: ticketsOuverts});
            })
    }

    render() {
        const {t} = this.props;
        return (

            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t("Liste des tickets ouverts")} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="!#"
                                                               onClick={event => event.preventDefault()}>{t("Tickets")}</a>
                            </li>
                            <li className="breadcrumb-item active"
                                aria-current="page">{t("Liste des tickets ouverts")}</li>
                        </ol>
                    </nav>
                </div>

                <br/> <br/>
                <Link to="/add-ticket">
                    <button type="button" className="btn btn-gradient-dark btn-rounded btn-icon mb-3"
                            title={t("Ajouter ticket")}>
                        <i className="mdi mdi-database-plus"> </i>
                    </button>
                </Link>
                <button type="button" className="btn btn-gradient-dark btn-rounded btn-icon" style={{float: 'right'}}
                        title="csv">
                    <CSVLink data={this.state.ticketsOuverts} headers={this.state.headers}
                             filename={"tickets_list.csv"}>

                        <i className="mdi mdi-folder-download" style={{color: 'white'}}></i>
                    </CSVLink>
                </button>


                <div className="row">
                    <div className="col grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">

                                <div className="search-field d-none d-md-block">
                                    <form className="d-flex align-items-center h-100"
                                          action="frontend/src/app/components/tickets/TicketsOuverts#">
                                        <div className="input-group">
                                            <div className="input-group-prepend bg-transparent">
                                                <i className="input-group-text border-0 mdi mdi-magnify"></i>
                                            </div>
                                            <input type="text" className="form-control bg-transparent border-0"
                                                   placeholder={t("Rechercher actif")} onChange={this.handleChange}/>
                                            <div className="input-group-prepend bg-transparent">
                                                <i className="input-group-text border-0 mdi mdi-magnify"></i>
                                            </div>
                                            <input type="text" className="form-control bg-transparent border-0"
                                                   placeholder={t("Rechercher vulnérabilité")}
                                                   onChange={this.handleChangeVul}/>
                                            <div className="input-group-prepend bg-transparent">
                                                <i className="input-group-text border-0 mdi mdi-magnify"></i>
                                            </div>
                                            <input type="text" className="form-control bg-transparent border-0"
                                                   placeholder={t("Rechercher service")}
                                                   onChange={this.handleChangeService}/>
                                        </div>
                                    </form>

                                </div>

                                <div className="table-responsive">
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
            </div>
        );
    }
}

export default withTranslation()(TicketsOuverts);