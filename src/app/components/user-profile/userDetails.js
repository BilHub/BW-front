import {Card, CardHeader, ListGroup, ListGroupItem} from "shards-react";
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withTranslation} from 'react-i18next';

class UserDetails extends Component {

    state = {
        username: "",
        firstName: "",
        lastName: "",
        phone: "",
        country: "",
        email: "",
        company: "",
        count_tickets: "",
        nb_assets: "",
        description: '',

    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        const role = user.role
        this.setState({role: role});
        const auth = `Bearer ${user.token}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth
            }
        }

        if (user) {
            const auth = `Bearer ${user.token}`
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth
                }
            }
            this.setState({username: user.username});
            this.setState({firstName: user.prenom});
            this.setState({lastName: user.nom});
            this.setState({company: user.company});
            this.setState({phone: user.phone});
            this.setState({email: user.email});
            this.setState({nb_assets: user.nb_assets});
            this.setState({username: user.username});
            this.setState({description: user.company_desc});
        }
    }

    render() {
        const {t} = this.props;
        return (
            <Card small className="mb-4 pt-3">
                <CardHeader className="border-bottom text-center">
                    <div className="mb-3 mx-auto">
                        <img
                            className="rounded-circle"
                            src="frontend/src/app/components/user-profile/userDetails"
                            alt=""
                            width="110"
                        />
                    </div>
                    <h4 className="mb-0">{this.state.firstName} {this.state.lastName}</h4>
                    <span className="text-muted d-block mb-2">manager</span>
                    <button type="button" className="btn btn-link btn-fw">
                        <Link to="/user-pages/change-password">

                            {t('Changer mot de passe')}

                        </Link>


                    </button>
                </CardHeader>
                <ListGroup flush>
                    <ListGroupItem className="px-4">
                        <div className="progress-wrapper">
                            <strong className="text-muted d-block mb-2">
                                {t('Identifiant')}
                            </strong>

                            <span>
               {this.state.username}
            </span>

                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="px-4">
                        <div className="progress-wrapper">
                            <strong className="text-muted d-block mb-2">
                                {t('Entreprise')}
                            </strong>

                            <span>
               {this.state.company}
            </span>

                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="px-4">
                        <div className="progress-wrapper">
                            <strong className="text-muted d-block mb-2">
                                {t("Description de l'entreprise")}
                            </strong>

                            <span>
               {this.state.description}
            </span>

                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="px-4">
                        <div className="progress-wrapper">
                            <strong className="text-muted d-block mb-2">
                                {t('Numéro de téléphone')}
                            </strong>

                            <span>
              {this.state.phone}
            </span>

                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="p-4">
                        <strong className="text-muted d-block mb-2">
                            Email
                        </strong>
                        <span>{this.state.email}</span>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        );
    }
}


export default withTranslation()(UserDetails);