import React, {Component} from 'react';
import {servicelist_url} from "../../utils/constants"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Link} from "react-router-dom";
import http from "../../http";
import {withTranslation} from 'react-i18next';




const options = {


    sizePerPage: 10,
    page: 1,
    alwaysShowAllBtns: false,
    hideSizePerPage: true,
    sizePerPageList: [10, 20, 30]

}


function actionsFormatter2(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (

        < div className="ml-3"
              style={{
                  textAlign: "left",

                  cursor: "pointer",
                  lineHeight: "normal"
              }}>
            <a href={`ServiceDetail/${row.id}`}>
                <span className="span_table"> {row.name} </span>
            </a>


        </div>

    );
}

function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        < div className="ml-5"
              style={{
                  textAlign: "left",

                  lineHeight: "normal"
              }}>

              <span className="badge badge-sm bg-gradient-success"> {row.count_assets}
                        </span>

        </div>
    );
}


class ListServices extends Component {
constructor(props) {
        super(props)
        const {t} = this.props;
    this.state = {
        listServices: [],
        columns : [
        {
        dataField: "name",
        text: t("Nom"),
        sort: true,
    },
    {
        dataField: "localisation",
        text: t("Localisation"),
        sort: true,
    },
    {
        dataField: "responsable",
        text: t("Responsable"),
        sort: true,
    },
        ]
    }
}
    componentDidMount() {
        http.get(servicelist_url)
            .then(res => {
                const listServices = res.data;
                console.log("listServices: !!!",listServices)
                this.setState({listServices});
            })
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">{t("Liste des services")}</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="!#"
                                                               onClick={event => event.preventDefault()}>{t("Services")}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t("Liste des services")}</li>
                        </ol>
                    </nav>
                </div>
                <Link to="/add-service">
                    <button type="button" className="btn btn-gradient-dark btn-rounded btn-icon mb-3"
                            title={t("Ajouter service")}>
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
                                        data={this.state.listServices}
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

export default withTranslation()(ListServices);