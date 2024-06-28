import React, {Component} from 'react';
import {obsolescence_list, ticket_api_url} from "../../utils/constants"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {withTranslation} from 'react-i18next';
import http from "../../http";
import filterFactory, { textFilter, selectFilter } from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';




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
            <a href={`obsolescence-detail/${row.id}`}>
                <span> {row.id} </span>
            </a>
        </div>
    );
}

class List extends Component {
    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            filtered: [],
            role: '',
            columns: [
                {
                    dataField: "id",
                    text: t("ID"),
                    sort: true,
                    formatter: actionsFormatterId,
                },
                {
                    dataField: "product_cpe",
                    text: t("Produit"),
                    sort: true,
                    filter: textFilter({placeholder: t('Produit') }),

                },
                {
                    dataField: "version",
                    text: t("Version"),
                    sort: true,

                },
                {
                    dataField: "releaseDate",
                    text: t("Date de sortie"),
                    sort: true,
                    filter: textFilter({placeholder: t('releaseDate') }),

                },
                {
                    dataField: "eol",
                    text: t("Date de fin de service"),
                    sort: true,
                    filter: textFilter({placeholder: t('Date de fin de service') }),
                },

            ],
        }
    }


    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({role: user.role});

        http.get(obsolescence_list)
            .then(res => {
                const ticketsOuverts = res.data;
                this.setState({filtered: ticketsOuverts});
            })
    }

    render() {
        const {t} = this.props;
        return (

            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t("Obsolescence")} </h3>
                </div>
                <br/> <br/>
                <div className="row">
                    <div className="col grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">

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
                                            filter={ filterFactory() }
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

export default withTranslation()(List);