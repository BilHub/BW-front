import React, {Component} from 'react';
import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2';
import {list_vuls_dashb_url} from "../../utils/constants"
import axios from "axios";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {withTranslation} from 'react-i18next';
import http from "../../http";
import circleSvg from "../../../assets/images/dashboard/circle.svg"
import {Link} from 'react-router-dom';

const columns = [

    {
        dataField: "date",
        sort: true,
        formatter: actionsFormatterDate,

    },

    {
        dataField: "asset_ref",
        text: "Actif",
        sort: true,
        formatter: actionsFormatterAsset,

    },
    {
        dataField: "cve",
        text: "Vulnérabilité",
        sort: true,
        formatter: actionsFormatterCve,
    },


]

function actionsFormatterCve(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            {row.cve}
        </div>
    );
}

function actionsFormatterAsset(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            {row.asset_ref}

        </div>
    );
}

function actionsFormatterDate(cell, row, rowIndex, formatExtraData, asset_ref) {
    return (
        < div>
            {row.date.substring(0, 10)}


        </div>
    );
}

const options = {


    sizePerPage: 10,
    page: 1,
    alwaysShowAllBtns: false,
    hideSizePerPage: true,
    sizePerPageList: [10, 20, 30]

}

export class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nbVuls: "",
            nbServices: "",
            nbAssets: "",
            data_dash: {},
            servicesNames: [],
            servicesTicketsCounts: [],
            tickets_criticity_x: [],
            tickets_criticity_y: [],
            gradientBar1: {},
            gradientdonut0: {},
            gradientdonut1: {},
            gradientdonut2: {},
            gradientdonut3: {},
            countEnattente: "",
            countEncours: "",
            countTraites: "",
            countFermes: "",
            listAffectedAsset: [],
            startDate: new Date(),
            recentTickets: [],
            visitSaleData: {},
            averageTime: [],
            visitSaleOptions: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            display: false,
                            min: 0,
                            stepSize: 20,
                            max: 80
                        },
                        gridLines: {
                            drawBorder: false,
                            color: 'rgba(235,237,242,1)',
                            zeroLineColor: 'rgba(235,237,242,1)'
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false,
                            color: 'rgba(0,0,0,1)',
                            zeroLineColor: 'rgba(235,237,242,1)'
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9c9fa6",
                            autoSkip: true,
                        },
                        categoryPercentage: 0.5,
                        barPercentage: 0.5
                    }]
                },
                legend: {
                    display: false,
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            },
            trafficData: {},
            trafficOptions: {
                responsive: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: false,

            },
            pieOptions: {
                responsive: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                plugins: {
                    legend: {
                        display: true,
                    }
                },
            },
            todos: [
                {
                    id: 1,
                    task: 'Pick up kids from school',
                    isCompleted: false
                },
                {
                    id: 2,
                    task: 'Prepare for presentation',
                    isCompleted: true
                },
                {
                    id: 3,
                    task: 'Print Statements',
                    isCompleted: false
                },
                {
                    id: 4,
                    task: 'Create invoice',
                    isCompleted: false
                },
                {
                    id: 5,
                    task: 'Call John',
                    isCompleted: true
                },
                {
                    id: 6,
                    task: 'Meeting with Alisa',
                    isCompleted: false
                }
            ],
            inputValue: '',
        }
        this.statusChangedHandler = this.statusChangedHandler.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    statusChangedHandler(event, id) {

        //const todoIndex = this.state.todos.findIndex( t => t.id === id );
        const todo = {...this.state.todos[id]};
        todo.isCompleted = event.target.checked;

        const todos = [...this.state.todos];
        todos[id] = todo;

        this.setState({
            todos: todos
        })
    }

    addTodo(event) {
        event.preventDefault();

        const todos = [...this.state.todos];
        todos.unshift({
            id: todos.length ? todos[todos.length - 1].id + 1 : 1,
            task: this.state.inputValue,
            isCompleted: false

        })

        this.setState({
            todos: todos,
            inputValue: ''
        })
    }

    removeTodo(index) {
        const todos = [...this.state.todos];
        todos.splice(index, 1);

        this.setState({
            todos: todos
        })
    }

    inputChangeHandler(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    componentDidMount() {
        http.get(list_vuls_dashb_url)
            .then(res => {
                const data = res.data;
                console.log('data', data)
                this.setState({tickets_criticity_x: data.liste_vuls2_chart2_x})
                this.setState({tickets_criticity_y: data.liste_vuls2_chart2_y})
                this.setState({countEnattente: data.count_en_attente})
                this.setState({countEncours: data.count_en_cours})
                this.setState({countTraites: data.count_traites})
                this.setState({countFermes: data.count_fermes})
                this.setState({servicesNames: data.services_tickets_name})
                this.setState({servicesTicketsCounts: data.tickets_services_count})
                this.setState({recentTickets: data.liste_vuls})
                this.setState({averageTime: data.listeDelta})
                this.setState({listAffectedAsset: data.outputList2_assets_x})
                this.setState({nbVuls: data.nb_vuls})
                this.setState({nbAssets: data.nb_assets})
                this.setState({nbServices: data.nb_services})
            })
        console.log('data tickets x', this.state.tickets_criticity_x)


        //your code
        var ctx = document.getElementById('visitSaleChart').getContext("2d")
        var gradientBar1 = ctx.createLinearGradient(0, 0, 0, 181)
        gradientBar1.addColorStop(0, '#a29c9c')
        gradientBar1.addColorStop(1, '#352f2f')
        this.setState({
            gradientBar1: gradientBar1
        })
        var gradientBar2 = ctx.createLinearGradient(0, 0, 0, 360)
        gradientBar2.addColorStop(0, 'rgba(54, 215, 232, 1)')
        gradientBar2.addColorStop(1, 'rgba(177, 148, 250, 1)')

        var gradientBar3 = ctx.createLinearGradient(0, 0, 0, 300)
        gradientBar3.addColorStop(0, 'rgba(255, 191, 150, 1)')
        gradientBar3.addColorStop(1, 'rgba(254, 112, 150, 1)')


        var gradientdonut0 = ctx.createLinearGradient(0, 0, 0, 181)
        gradientdonut0.addColorStop(0, '#FFDD00')
        gradientdonut0.addColorStop(1, '#FBB034')
        this.setState({
            gradientdonut0: gradientdonut0
        })


        var gradientdonut1 = ctx.createLinearGradient(0, 0, 0, 181)
        gradientdonut1.addColorStop(0, 'rgba(54, 215, 232, 1)')
        gradientdonut1.addColorStop(1, 'rgba(177, 148, 250, 1)')
        this.setState({
            gradientdonut1: gradientdonut1
        })
        var gradientdonut2 = ctx.createLinearGradient(0, 0, 0, 50)
        gradientdonut2.addColorStop(0, 'rgba(6, 185, 157, 1)')
        gradientdonut2.addColorStop(1, 'rgba(132, 217, 210, 1)')
        this.setState({
            gradientdonut2: gradientdonut2
        })
        var gradientdonut3 = ctx.createLinearGradient(0, 0, 0, 300)
        gradientdonut3.addColorStop(0, '#ff6e6e')
        gradientdonut3.addColorStop(1, '#ff6e6e')
        this.setState({
            gradientdonut3: gradientdonut3
        })


        const data = {
            labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
            datasets: [{
                label: '# of Votes',
                data: [10, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                fill: false
            }]
        };
        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            },
            elements: {
                point: {
                    radius: 0
                }
            }

        };
        const newTrafficData = {
            datasets: [{
                data: [30, 30, 40],
                backgroundColor: [
                    gradientdonut0,
                    gradientdonut1,
                    gradientdonut2,
                    gradientdonut3
                ],
                hoverBackgroundColor: [
                    gradientdonut0,
                    gradientdonut1,
                    gradientdonut2,
                    gradientdonut3
                ],
                borderColor: [
                    gradientdonut0,
                    gradientdonut1,
                    gradientdonut2,
                    gradientdonut3
                ],
                legendColor: [
                    gradientdonut0,
                    gradientdonut1,
                    gradientdonut2,
                    gradientdonut3
                ]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Search Engines',
                'Direct Click',
                'Bookmarks Click',
            ]
        };

    }


    toggleProBanner() {
        document.querySelector('.proBanner').classList.toggle("hide");
    }

    render() {
        const {t} = this.props;
        return (
            <div>

                <div className="page-header">
                    <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span> {t('Tableau de bord')} </h3>

            


                </div>
                <div className="row">
                    
                        <div className="col-md-3 stretch-card grid-margin"
                        >
                            <div className="card bg-gradient-secondary card-img-holder text-white">
                                <div className="card-body">
                                    <Link to="/produits-vulnerables"> 
                                    <img src= {circleSvg}
                                        className="card-img-absolute" alt="circle"/>
                                    </Link>
                            
                                    <h4 className="font-weight-normal mb-3"> {t('Vulnérabilités')} <i
                                        className="mdi mdi-spider mdi-24px float-right"></i>
                                    </h4>
                                    <h2 className="mb-5"> {this.state.nbVuls}</h2>
                            
                                </div>

                            </div>
                        </div>
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-dark card-img-holder text-white">
                            <div className="card-body">
                            <Link to="/actifs-liste"> 
                                <img src={circleSvg}
                                     className="card-img-absolute" alt="circle"/>
                            </Link>
                                <h4 className="font-weight-normal mb-3">{t('Actifs')} <i
                                    className="mdi mdi-alert-circle-outline mdi-24px float-right"></i>
                                </h4>
                                <h2 className="mb-5">{this.state.nbAssets}</h2>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                            <Link to="/services-liste"> 
                                <img src={circleSvg}
                                     className="card-img-absolute" alt="circle"/>
                            </Link>
                                <h4 className="font-weight-normal mb-3">{t('Services')} <i
                                    className="mdi mdi-table-large mdi-24px float-right"></i>
                                </h4>
                                <h2 className="mb-5"> {this.state.nbServices}</h2>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-primary card-img-holder text-white">
                            <div className="card-body">
                            <Link to="/tickets-ouverts"> 
                                <img src={circleSvg}
                                     className="card-img-absolute" alt="circle"/>
                            </Link>
                                <h4 className="font-weight-normal mb-3">{t('Tickets')} <i
                                    className="mdi mdi-ticket-account mdi-24px float-right"></i>
                                </h4>
                                <h2 className="mb-5">{parseInt(this.state.countFermes, 10) + parseInt(this.state.countEnattente, 10) + parseInt(this.state.countEncours, 10) + parseInt(this.state.countTraites, 10)}</h2>
                                <h6 className="card-text">{t('Tickets ouverts')}: {parseInt(this.state.countEnattente, 10) + parseInt(this.state.countEncours, 10) + parseInt(this.state.countTraites, 10)}</h6>
                                <h6 className="card-text">{t('Tickets fermés')}: {parseInt(this.state.countFermes, 10)}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="clearfix mb-4">
                                    <h4 className="card-title float-left">{t('Nombre de tickets par criticité')}</h4>
                                    <div id="visit-sale-chart-legend"
                                         className="rounded-legend legend-horizontal legend-top-right float-right">
                                        <ul>
                                            <li>
                        <span className="legend-dots bg" style={{backgroundColor: '#352f2f'}}>
                        </span>{t('Nombre de tickets')}
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <Bar ref='chart' className="chartLegendContainer" data={{
                                    labels: this.state.tickets_criticity_x,
                                    datasets: [
                                        {
                                            label: t("NOMBRE DE TICKETS"),
                                            borderColor: this.state.gradientBar1,
                                            backgroundColor: this.state.gradientBar1,
                                            hoverBackgroundColor: this.state.gradientBar1,
                                            legendColor: this.state.gradientBar1,
                                            pointRadius: 0,
                                            fill: false,
                                            borderWidth: 1,
                                            data: this.state.tickets_criticity_y
                                        },

                                    ]
                                }} options={this.state.visitSaleOptions} id="visitSaleChart"
                                     plugins={[ChartDataLabels]}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{t('Nombre de tickets par état')}</h4>
                                <Doughnut data={{
                                    datasets: [{
                                        data: [this.state.countEncours, this.state.countTraites, this.state.countFermes, this.state.countEnattente],
                                        backgroundColor: [
                                            this.state.gradientdonut0,
                                            this.state.gradientdonut1,
                                            this.state.gradientdonut2,
                                            this.state.gradientdonut3
                                        ],
                                        hoverBackgroundColor: [
                                            this.state.gradientdonut0,
                                            this.state.gradientdonut1,
                                            this.state.gradientdonut2,
                                            this.state.gradientdonut3
                                        ],
                                        borderColor: [
                                            this.state.gradientdonut0,
                                            this.state.gradientdonut1,
                                            this.state.gradientdonut2,
                                            this.state.gradientdonut3
                                        ],
                                        legendColor: [
                                            this.state.gradientdonut0,
                                            this.state.gradientdonut1,
                                            this.state.gradientdonut2,
                                            this.state.gradientdonut3
                                        ]
                                    }],

                                    // These labels appear in the legend and in the tooltips when hovering different arcs
                                    labels: ['En cours', 'Traité', 'Fermé', 'En attente']
                                }}
                                          options={this.state.trafficOptions} plugins={[ChartDataLabels]}/>
                                <div id="traffic-chart-legend"
                                     className="rounded-legend legend-vertical legend-bottom-left pt-4">
                                    <ul>
                                        <li>
                                            <span className="legend-dots bg-danger"></span>{t('En attente')}
                                            <span
                                                className="float-right">{Math.round((parseInt(this.state.countEnattente, 10) / (parseInt(this.state.countEnattente, 10) + parseInt(this.state.countEncours, 10) + parseInt(this.state.countTraites, 10) + parseInt(this.state.countFermes, 10))) * 100)}%</span>
                                        </li>
                                        <li>
                                            <span
                                                className="legend-dots bg-warning"></span>{t('En cours de traitement')}
                                            <span
                                                className="float-right">{Math.round((parseInt(this.state.countEncours, 10) / (parseInt(this.state.countEnattente, 10) + parseInt(this.state.countEncours, 10) + parseInt(this.state.countTraites, 10) + parseInt(this.state.countFermes, 10))) * 100)}%</span>
                                        </li>
                                        <li>
                                            <span className="legend-dots bg-info"></span>{t('Traité')}
                                            <span
                                                className="float-right">{Math.round((parseInt(this.state.countTraites, 10) / (parseInt(this.state.countEnattente, 10) + parseInt(this.state.countEncours, 10) + parseInt(this.state.countTraites, 10) + parseInt(this.state.countFermes, 10))) * 100)}%</span>
                                        </li>
                                        <li>
                                            <span className="legend-dots bg-success"></span>{t('Fermé')}
                                            <span
                                                className="float-right">{Math.round((parseInt(this.state.countFermes, 10) / (parseInt(this.state.countEnattente, 10) + parseInt(this.state.countEncours, 10) + parseInt(this.state.countTraites, 10) + parseInt(this.state.countFermes, 10))) * 100)}%</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{t('Tickets ouverts par service')}</h4>
                                <Pie data={{
                                    datasets: [{
                                        data: this.state.servicesTicketsCounts,
                                        backgroundColor: [
                                            this.state.gradientdonut2,
                                            this.state.gradientdonut3

                                        ],
                                        hoverBackgroundColor: [
                                            this.state.gradientdonut2,
                                            this.state.gradientdonut3,

                                        ],
                                        borderColor: [
                                            this.state.gradientdonut2,
                                            this.state.gradientdonut3,

                                        ],
                                        legendColor: [
                                            this.state.gradientdonut2,
                                            this.state.gradientdonut3,

                                        ]
                                    }],

                                    // These labels appear in the legend and in the tooltips when hovering different arcs
                                    labels: this.state.servicesNames

                                }} options={this.state.pieOptions} plugins={[ChartDataLabels]}/>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{t('Temps moyen de traitement des tickets par mois')}</h4>
                                <Line data={{
                                    labels: [t('Janvier'), t('Février'), t('Mars'), t('Avril'), t('Mai'), t('Juin'), t('Juillet'), t('Août'), t('Septembre'), t('Octobre'), t('Novembre'), t('Décembre')],
                                    datasets: [{
                                        label: t("Temps moyen (j/mois)"),
                                        data: this.state.averageTime,
                                        fill: true,
                                        backgroundColor: (context: ScriptableContext<"line">) => {
                                            const ctx = context.chart.ctx;
                                            const gradient = ctx.createLinearGradient(245, 56, 68, 0);
                                            gradient.addColorStop(0, "#F53844");
                                            gradient.addColorStop(1, "#42378F");
                                            return gradient;
                                        },

                                    },

                                    ],
                                }}
                                      plugins={[ChartDataLabels]}


                                />
                            </div>
                        </div>
                    </div>


                </div>

                <div className="row">
                    <div className="col-xl-7 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{t('Derniers tickets ouverts')}</h4>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th> #</th>
                                            <th> {t('Date de création')} </th>
                                            <th> {t('Vulnérabilité')} </th>

                                            <th> {t('Actif')} </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.recentTickets.map((ticket, i) => {
                                            const {date, asset_ref, cve} = ticket;
                                            return (
                                                <tr>
                                                    <td> {i + 1} </td>
                                                    <td> {date} </td>
                                                    <td> {cve} </td>
                                                    <td> {asset_ref} </td>
                                                </tr>
                                            )
                                        })}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{t('Top 5 des actifs les plus touchés')}</h4>

                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th> {t('Actifs')} </th>
                                            <th> {t('Nombre de tickets')} </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.listAffectedAsset.map((element) => {
                                            const {asset_ref, size} = element;
                                            return (
                                                <tr>

                                                    <td> {asset_ref} </td>
                                                    <td> {size} </td>
                                                </tr>
                                            )
                                        })}


                                        </tbody>
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

const ListItem = (props) => {

    return (
        <li className={(props.isCompleted ? 'completed' : null)}>
            <div className="form-check">
                <label htmlFor="" className="form-check-label">
                    <input className="checkbox" type="checkbox"
                           checked={props.isCompleted}
                           onChange={props.changed}
                    /> {props.children} <i className="input-helper"></i>
                </label>
            </div>
            <i className="remove mdi mdi-close-circle-outline" onClick={props.remove}></i>
        </li>
    )
};
export default withTranslation()(Dashboard);