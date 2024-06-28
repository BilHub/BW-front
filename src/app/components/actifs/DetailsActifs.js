import React, {Component, useState} from 'react';
import {
    asset_detail_url, remove_product_url

} from "../../utils/constants"
import './styles.css'
import axios from "axios";
import {FaPlusSquare, FaMinusSquare, FaEdit, FaSearchengin, FaRegEdit, FaTrashAlt, FaToggleOff} from "react-icons/fa";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Link} from "react-router-dom" ;
import {Modal} from 'react-bootstrap';
import http from "../../http";
import {withTranslation} from "react-i18next";

const options = {


    sizePerPage: 10,
    page: 1,
    alwaysShowAllBtns: false,
    hideSizePerPage: true,
    sizePerPageList: [10, 20, 30]

}


class DetailsActifs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            asset: [],
            showPopup: false,
            columns: [
                {
                    dataField: "cpe_readable",
                    text: "Produit",
                    sort: true,
                    formatter: this.actionsFormatterProduct,
                    style: {'white-space': 'nowrap'}
                },
                {
                    dataField: "producer",
                    text: "Fournisseur",
                    sort: true,
                    formatter: this.actionsFormatterVendor,
                },

                {
                    dataField: 'actions',
                    text: 'Actions',
                    isDummyField: true,
                    csvExport: false,
                    formatter: (cell, row) => (
                        <RemoveProductPopup
                            productId={row.cpe}
                            assetRef={row.asset_ref}


                        />
                    )
                },
            ]
        }
        this.actionsFormatter = this.actionsFormatter.bind(this);
        this.actionsFormatterVendor = this.actionsFormatterVendor.bind(this);
        this.actionsFormatterProduct = this.actionsFormatterProduct.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    actionsFormatter(cell, row, rowIndex, formatExtraData) {
        return (
            <div>
                <button onClick={this.handleOpen}><FaTrashAlt color="red"/></button>
            </div>
        );
    }

    actionsFormatterVendor(cell, row, rowIndex, formatExtraData) {
        return (
            < div style={{'whiteSpace': 'nowrap', color: 'black',}}>

                &nbsp; &nbsp; {row.producer}

            </div>
        );
    }

    actionsFormatterProduct(cell, row, rowIndex, formatExtraData) {
        return (
            <div style={{color: 'black'}}>

                &nbsp; &nbsp; {row.cpe_readable}

            </div>
        );
    }

    handleRemove() {
        console.log('he')
        this.setState({showPopup: false})

    }

    handleOpen() {
        console.log('open', this.state.showPopup)
        this.setState({showPopup: true})

    }

    componentDidMount() {
        const id = this.props.match.params.id;

        http.get(`${asset_detail_url}${id}`)
            .then(res => {
                const dataList = res.data;
                console.log("dataList: !!!!!!!", dataList)
                const asset = dataList.map(item => {
                    return {
                        ...item,
                        cpe_readable: item.cpe_readable.charAt(0).toUpperCase() + item.cpe_readable.slice(1).replace(/_/g, " "),
                        producer: item.producer.charAt(0).toUpperCase() + item.producer.slice(1).replace(/_/g, " "),
                    }
                })
                this.setState({asset});
            })
    }

    render() {
        const {t} = this.props

        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">{t("Liste des produits")} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/actifs-liste"
                                                               onClick={event => {event.preventDefault();  window.location.href="/actifs-liste";}}>{t('Actifs')}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{t("Liste des produits")}</li>
                        </ol>
                    </nav>
                </div>
                <div>

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
                                        data={this.state.asset}
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

function RemoveProductPopup({productId, assetRef}) {
    const [showPopup, setShowPopup] = useState(false);

    function handleRemove() {
        http.post(remove_product_url, {'id': productId, 'asset_ref': assetRef})
            .then((response) => {
                console.log(response);
                window.location.reload(false);

            }, (error) => {
                console.log(error);

            });
        setShowPopup(false);
    }

    return (
        <>
            <button className="btn" onClick={() => setShowPopup(true)}><i className="mdi mdi-trash-can-outline"></i></button>
            <Modal show={showPopup} onHide={() => setShowPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Voulez-vous vraiment supprimer ce produit
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-gradient-dark btn-fw" onClick={() => setShowPopup(false)}>
                        Annuler
                    </button>
                    <button className="btn red btn-fw" onClick={handleRemove}>
                        Supprimer
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default withTranslation()(DetailsActifs);