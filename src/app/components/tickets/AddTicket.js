import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import {add_ticket_url, list_products_url} from "../../utils/constants"
import Select from "react-select";
import {withTranslation} from 'react-i18next';
import http from "../../http";
import {CancelButton} from "../shared/buttons/CancelButton";


export class AddTicket extends Component {
    constructor(props) {
        super(props);
        const {t} = this.props;
        this.state = {
            assets: [],
            assets_2: [],
            assets_3: [],
            products: [],
            messageErrors: "",
            selectedOptions: [],
            actifSelected: "",
            cpe: "",
            cvss: "",
            title: "",
            score: "",
            action: "",
            commentaire: "",
            info: "",
            dueDate: new Date("01-02-2021"),
            description: "",


        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        http.get(list_products_url)
            .then(res => {
                this.setState({assets: res.data.assets});
                this.setState({products: res.data.products});
                this.setState({assets_3: res.data.products});
                this.setState({assets_2: res.data.products});
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        const specialChars = /[`!@#$%^&*()+\=\[\]{};:\\|,.<>\/?~]/;

        if (specialChars.test(this.state.cve)) {
            this.setState({messageErrors: this.props.t("le nom du cve ne peut pas contenir des caractères spéciaux")})

        } else if (specialChars.test(this.state.action)) {
            this.setState({messageErrors: this.props.t("le champ action ne peut pas contenir des caractères spéciaux")})

        } else if (specialChars.test(this.state.action)) {
            this.setState({messageErrors: this.props.t("le champ commentaire ne peut pas contenir des caractères spéciaux")})

        } else if (specialChars.test(this.state.title)) {
            this.setState({messageErrors: this.props.t("le champ titre ne peut pas contenir des caractères spéciaux")})

        } else if (specialChars.test(this.state.description)) {
            this.setState({messageErrors: this.props.t("le champ description ne peut pas contenir des caractères spéciaux")})

        } else {
            http.post(add_ticket_url, {
                'asset': this.state.selectedOptions.label,
                'cpe': this.state.cpe,

                'score': this.state.score
            }).then((response) => {
                console.log(response);
                this.props.history.push("/tickets-ouverts");
            }, (error) => {
                console.log(error);

            });
        }


    }

    handleSelect(data) {
        this.setState({selectedOptions: data});

        console.log("slctopt", data.label)
        var selected = [data.label]
        this.setState({actifSelected: data.label});
        this.setState({assets_3: []});

        if (data.label) {
            let bigCities = [];
            for (let i = 0; i < this.state.assets_2.length; i++) {

                if (this.state.assets_2[i].asset_ref === data.label) {
                    bigCities.push(this.state.assets_2[i]);
                }
            }

            console.log('bigcities', bigCities)
            this.setState({assets_3: bigCities});
            console.log("assets3", this.state.assets_3)


        } else {
            this.setState({assets_3: []});
            this.setState({assets_3: this.state.assets_2});

        }

    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t('Ajouter ticket')} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href=""
                                                                onClick={event => {event.preventDefault();  window.location.href="/tickets-ouverts";}}>{t('Tickets')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Ajouter ticket')}</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {this.state.messageErrors ?
                                    <span badge className="badge badge-danger">{this.state.messageErrors}</span> : null}
                                <br/>
                                <form className="forms-sample" onSubmit={this.handleSubmit}>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Actif')} </label>
                                        <div className="col-sm-3">
                                            {this.state.assets ? <Select
                                                options={this.state.assets}
                                                placeholder={t("Choisir actif")}
                                                value={this.state.selectedOptions}
                                                onChange={this.handleSelect}
                                                isSearchable={true}

                                            /> : null}
                                        </div>
                                    </Form.Group>


                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Produit')} </label>
                                        <div className="col-sm-3">
                                            <select required className="custom-select" value={this.state.cpe}
                                                    onChange={(e) => this.setState({cpe: e.target.value})}>

                                                {
                                                    this.state.assets_3.map((s) => <option key={s.cpe}
                                                                                           value={s.cpe}>{s.cpe}</option>)
                                                }
                                            </select>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">Score </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          id="exampleInputUsername2" placeholder="description"
                                                          value={this.state.score}
                                                          onChange={(e) => this.setState({score: e.target.value})}/>
                                        </div>
                                    </Form.Group>

                                    <button type="submit"
                                            className="btn btn-gradient-primary mr-2">{t('Soumettre')}</button>
                                    <CancelButton url={"/tickets-ouverts"} t={t}></CancelButton>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default withTranslation()(AddTicket)
