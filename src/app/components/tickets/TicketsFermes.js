import React, { Component } from 'react';
import {
tickets_history_url

} from "../../utils/constants"
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Link} from "react-router-dom" ;
import { MdAssignmentInd, MdAssignmentTurnedIn } from "react-icons/md";
import {  FaTimes } from "react-icons/fa";
import { withTranslation } from 'react-i18next';
import http from "../../http";






const options = {


        sizePerPage: 10,
        page: 1,
        alwaysShowAllBtns: false,
        hideSizePerPage: true,
        sizePerPageList: [10,20,30]

      }


 function actionsFormatter3(cell, row, rowIndex, formatExtraData) {
     return (
         < div
               style={{ textAlign: "left",
               color: 'black',

                 lineHeight: "normal" }}>

  { row.status === 0 ? <label className="badge badge-important"> en attente </label> :
  row.status === 1 ? <label className="badge badge-critique"> en traitement </label>:
  row.status === 2 ? <label className="badge badge-majeur"> traité </label>:
  row.status === -1 ? <label className="badge badge-mineur"> fermé </label>: null
  }
      </div>
 ); }

 function actionsFormatterScore(cell, row, rowIndex, formatExtraData, asset_ref) {
     return (
           < div >
         {row.score}

      </div>
 ); }

function actionsFormatterCve(cell, row, rowIndex, formatExtraData, asset_ref) {
     return (
            < div >
         {row.cve}

      </div>
 ); }


 function actionsFormatterAsset(cell, row, rowIndex, formatExtraData, asset_ref) {
     return (
          < div >
         {row.asset_ref}

      </div>
 ); }

function actionsFormatterClosedDate(cell, row, rowIndex, formatExtraData, asset_ref) {
     return (
           < div >
         {row.closed_at}

      </div>
 ); }

 function actionsFormatterCreation(cell, row, rowIndex, formatExtraData, asset_ref) {
     return (
           < div >
         {row.created_at}

      </div>
 ); }

function actionsFormatter2(cell, row, rowIndex, formatExtraData, asset_ref) {
     return (
           < div>
          <a href={`ticket-detail/${row.id}`}  >
                                 <span > {row.id} </span>
                              </a>


      </div>
 ); }


class TicketsFermes extends Component {
constructor(props){
    super(props)
    const { t } = this.props;
this.state = {
    ticketsFermes: [],
    columns: [

  {
    dataField: "id",
    text: "ID",
    sort: true,
    formatter: actionsFormatter2,



  },

  {
    dataField: "created_at",
    text: t("Date de création"),
    sort: true,
    formatter: actionsFormatterCreation,



  },

   {
    dataField: "closed_at",
    text: t("Date de clôture"),
    sort: true,
   formatter: actionsFormatterClosedDate,


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



  }




]

  }
  }
componentDidMount() {
    http.get(tickets_history_url)
      .then(res => {
        const ticketsFermes = res.data;
        this.setState({ ticketsFermes });
      })
  }

  render () {

   const { t } = this.props;
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> {t("Liste des tickets fermés")} </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/tickets-ouverts" onClick={event => event.preventDefault()}>Tickets</a></li>
              <li className="breadcrumb-item active" aria-current="page">{t("Liste des tickets fermés")}</li>
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

        keyField="id"
        data={this.state.ticketsFermes}
        columns={this.state.columns}
        bordered={ false }
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

export default withTranslation()(TicketsFermes);