import React, {Component} from 'react';
import {abonnement_url} from "../../utils/constants"
import {GrTechnology} from "react-icons/gr";
import {MdCallToAction, MdDescription, MdHighlight, MdInsertComment, MdOutlineLaptopMac} from "react-icons/md";
import {FaShieldVirus, FaUserAlt} from "react-icons/fa";
import {GiMatterStates} from "react-icons/gi";
import {AiOutlineSolution, AiTwotoneBank, AiFillContainer} from "react-icons/ai"
import { BsFillPeopleFill, BsFillBagPlusFill, BsFillBookmarkCheckFill, BsFillBookmarkDashFill } from "react-icons/bs";
import {Chrono} from "react-chrono";
import {withTranslation} from 'react-i18next';
import http from "../../http";
import {Link} from "react-router-dom";
export class Abonnement extends Component {

    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
           abo: {}, histories: [], showDetails: true, showHistory: false, id: this.props.id

        }
        this.showHideContentDetails = this.showHideContentDetails.bind(this);
        this.showHideContentHistory = this.showHideContentHistory.bind(this);
    }

    showHideContentDetails() {

        this.setState({
            showDetails: true
        });
        this.setState({
            showHistory: false
        });

    }

    showHideContentHistory() {
        this.setState({
            showDetails: false
        });
        this.setState({
            showHistory: true
        });
    }

    componentDidMount() {
        // const d = http.post(abonnement_url)
        http.get(`${abonnement_url}`)
            .then(res => {
                const abo= res.data;
                console.log("abo result !!! :", abo)
                this.setState({abo});
            })

    }

    render() {
        const {t} = this.props;
        return (<div>
                <div className="page-header">
                    <h3 className="page-title"> Détail abonnement </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">

                                    <a href="">Abonnement</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Détail abonnement')}</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default active"
                                            onClick={this.showHideContentDetails}> {t('Détails')}</button>

                                </div>


                                    <div class="row">

                                        <div class="col-md-12">
                                            <ul class="list-group fa-padding">
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><AiTwotoneBank size={37}/>
                                                                <h9> &nbsp; {t("Nom de l'entreprise ")}  </h9>
                                                            </h6>
                                                            <h9>
                                                                {this.state.abo.name} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><AiFillContainer size={37}/> &nbsp; {t('Type abonnement')} </h6>
                                                            <h9>
                                                                {this.state.abo.Type} </h9>
                                                        </div>
                                                          <Link to="/upgrade-subscription">
                                                           Changer d'abonnement
                                                          </Link>

                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><BsFillBookmarkCheckFill size={37}/> &nbsp; {t('Date de début')}
                                                            </h6>
                                                            <h9>
                                                                {this.state.abo.Date_de_debut} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><BsFillBookmarkDashFill size={37}/> &nbsp; {t('Date de fin')}
                                                            </h6>
                                                            <h9>
                                                                {this.state.abo.Date_de_fin} </h9>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><BsFillBagPlusFill size={37}/> &nbsp; {t("Nombre d'actifs autorisés")} </h6>
                                                            <h9>
                                                                {this.state.abo.asset_credits} ({this.state.abo.assets_number} consommés) </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><BsFillPeopleFill  size={37}/> &nbsp; {t("Nombre de collaborateurs autorisés")}</h6>
                                                            <h9>
                                                                {this.state.abo.user_credits} </h9>
                                                        </div>
                                                    </div>
                                                </li> */}




                                            </ul>


                                        </div>

                                    </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default withTranslation()(Abonnement)
