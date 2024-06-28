import React, {Component} from 'react';
import {collab_url, user_delete} from "../../utils/constants"
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {withTranslation} from 'react-i18next';
import {CSVLink} from "react-csv";
import http from "../../http";
import {Link} from "react-router-dom";
import {FaTrashAlt} from "react-icons/fa";



const options = {


    sizePerPage: 10,
    page: 1,
    alwaysShowAllBtns: false,
    hideSizePerPage: true,
    sizePerPageList: [10, 20, 30]
}





class Collab extends Component {
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
                {
                    dataField: 'actions',
                    text: 'Actions',
                    isDummyField: true,
                    csvExport: false,
                    formatter: (cell, row, rowIndex, formatExtraData) => this.actionsRemoveCollab(cell, row, rowIndex, formatExtraData),
                },

            ],
        },
        this.actionsRemoveCollab = this.actionsRemoveCollab.bind(this)
        this.removeCollab = this.removeCollab.bind(this);
        
    }
    removeCollab(id){

        http.post(user_delete, {"user_id":id})
        .then(response => window.location.reload(false))
        .catch(error => console.log("error delete user: !!!!",error))
    }
    actionsRemoveCollab(cell, row, rowIndex, formatExtraData) {  
                  
        return (
            <button className="btn" onClick={()=> this.removeCollab(row.id)}><i className="mdi mdi-trash-can-outline"></i></button>
        );
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

              <Link to="add-collab">
                    <button type="button" className="btn btn-gradient-dark btn-rounded btn-icon mb-3"
                            title={t("Ajouter collaborateur")}>
                        <i className="mdi mdi-database-plus"> </i>
                    </button>
                </Link>

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

function RemoveProductPopup({productId, assetRef}) {
    

    
    

    return (
        <>
            
        </>
    );
}

export default withTranslation()(Collab);