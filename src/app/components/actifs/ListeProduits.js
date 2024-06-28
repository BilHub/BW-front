import React, {Component} from 'react';
import {products_url} from "../../utils/constants"
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {withTranslation} from 'react-i18next';
import {CSVLink} from "react-csv";
import http from "../../http";


const options = {


    sizePerPage: 10,
    page: 1,
    alwaysShowAllBtns: false,
    hideSizePerPage: true,
    sizePerPageList: [10, 20, 30]
}

function actionsFormatterId(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            <a href={`actif-detail/${row.asset_ref}`}>
                <span> {row.asset_ref} </span>
            </a>
        </div>
    );
}

function actionsFormatterProduct(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div className="ml-3"
              style={{
                  textAlign: "left",
                  color: 'black',
                  lineHeight: "normal"
              }}>
            {row.cpe_readable}

        </div>
    );
}

function actionsFormatterProducer(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div className="ml-3"
              style={{
                  textAlign: "left",
                  color: 'black',

                  lineHeight: "normal"
              }}>
            {row.producer}

        </div>
    );
}

class Products extends Component {
    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            products: [],
            columns: [
                {
                    dataField: "name",
                    text: t("Nom du produit"),
                    sort: true,

                },
                {
                    dataField: "version",
                    text: t("Version"),
                    sort: true,

                },
                {
                    dataField: "producer",
                    text: t("Fournisseur"),
                    sort: true,

                },
                {
                    dataField: "asset_ref",
                    text: t("Nom de l'actif "),
                    sort: true,
                    formatter: actionsFormatterId,

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
        http.get(products_url)
            .then(res => {
                const dataList = res.data;
                const products = dataList.map(product => {
                    return {
                        ...product,
                        name: product.name.charAt(0).toUpperCase() + product.name.slice(1).replace(/_/g, " "),
                        producer: product.producer.charAt(0).toUpperCase() + product.producer.slice(1).replace(/_/g, " "),
                    }
                })
                console.log("products list: !!!!!", products)
                this.setState({products});
            })
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">{t('Liste des produits')}</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/actifs-liste"
                                                               onClick={event => {event.preventDefault();  window.location.href="/actifs-liste";}}>{t('Actifs')}</a>
                            </li>

                             <li className="breadcrumb-item active"
                                aria-current="page">{t("Liste des produits")}</li>
                        </ol>
                        <button type="button" className="btn btn-gradient-dark btn-rounded btn-icon" style={{float: 'right'}}
                        title="csv">
                    <CSVLink data={this.state.products} headers={this.state.headers}
                             filename={"produits_list.csv"}>

                        <i className="mdi mdi-folder-download" style={{color: 'white'}}></i>
                    </CSVLink>
                </button>
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
                                        data={this.state.products}
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

export default withTranslation()(Products);