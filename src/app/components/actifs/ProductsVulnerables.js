import React, {Component} from 'react';
import {products_list_url} from "../../utils/constants"
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

class ProductsVulnerables extends Component {
    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            productsVulnerables: [],
            columns: [
                {
                    dataField: "cpe_readable",
                    text: t("Produit"),
                    sort: true,
                    formatter: actionsFormatterProduct,


                },
                {
                     dataField: "asset_ref",
                     text: t("Actifs"),
                     sort: true,


                },

                {
                    dataField: "producer",
                    text: t("Fournisseur"),
                    sort: true,
                    formatter: actionsFormatterProducer,


                }

            ]

        }
    }

    componentDidMount() {
        http.get(products_list_url)
            .then(res => {
                const dataList = res.data;
                const productsVulnerables = dataList.map(item => {
                    return {
                        ...item,
                        cpe_readable: item.cpe_readable.charAt(0).toUpperCase() + item.cpe_readable.slice(1).replace(/_/g, " "),
                        producer: item.producer.charAt(0).toUpperCase() + item.producer.slice(1).replace(/_/g, " "),
                    }
                })
                console.log("productsVulnerables:!!!!!!!!", productsVulnerables)
                this.setState({productsVulnerables});
            })
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t('Liste des produits vulnérables')} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/actifs-liste"
                                                               onClick={event => {event.preventDefault();  window.location.href="/actifs-liste";}}>{t('Actifs')}</a>
                            </li>
                            <li className="breadcrumb-item active"
                                aria-current="page">{t('Liste des produits vulnérables')}</li>
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

                                        keyField="cpe_readable"
                                        data={this.state.productsVulnerables}
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

export default withTranslation()(ProductsVulnerables);