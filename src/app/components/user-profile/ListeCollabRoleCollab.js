import React, {Component} from 'react';
import {collab_url} from "../../utils/constants"
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {withTranslation} from 'react-i18next';
import {CSVLink} from "react-csv";
import http from "../../http";
import {Link} from "react-router-dom";


const options = {


    sizePerPage: 10,
    page: 1,
    alwaysShowAllBtns: false,
    hideSizePerPage: true,
    sizePerPageList: [10, 20, 30]
}





class ListeCollabRoleCollab extends Component {
    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            collab: [],
            columns: [
                {
                    dataField: "username",
                    text: t("Nom du collaborateur"),
                    sort: true,

                },
                {
                    dataField: "phone",
                    text: t("Téléphone"),
                    sort: true,

                },
                 {
                    dataField: "email",
                    text: t("Email"),
                    sort: true,

                },
                {
                    dataField: "role",
                    text: t("Rôle"),
                    sort: true,

                },

            ],
             headers: [{label: "nom", key: "name"},

                {label: "asset_ref", key: "asset_ref"},
                {label: "nom", key: "name"},
                {label: "fournisseur", key: "producer"},
                {label: "version", key: "version"},



            ]

        }
    }

    componentDidMount() {
        http.get(collab_url)
            .then(res => {
                const collab = res.data;
                this.setState({collab});
            })
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">{t('Liste des collaborateurs')}</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href=""
                                                               onClick={event => {event.preventDefault();  window.location.href="";}}>{t('Collaborateurs')}</a>
                            </li>

                             <li className="breadcrumb-item active"
                                aria-current="page">{t("Liste des collaborateurs")}</li>
                        </ol>
                    </nav>
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
                                        keyField="name"
                                        data={this.state.collab}
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
        )
    }
}

export default withTranslation()(ListeCollabRoleCollab);