import React, {Component} from 'react';
import {ProgressBar} from 'react-bootstrap';
import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2';
import axios from "axios";
import http from "../../http";
import {list_vuls_dash_v2} from "../../utils/constants";

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

export class DashboardBrightwatch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            recentTickets: [],
            visitSaleData: {},
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

    componentDidMount() {
        http.get(list_vuls_dash_v2)
            .then(res => {
                const {liste_vuls} = res.data;
                this.setState({recentTickets: liste_vuls});
            })
    }

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
        //your code
        var ctx = document.getElementById('visitSaleChart').getContext("2d")
        var gradientBar1 = ctx.createLinearGradient(0, 0, 0, 181)
        gradientBar1.addColorStop(0, 'rgba(218, 140, 255, 1)')
        gradientBar1.addColorStop(1, 'rgba(154, 85, 255, 1)')

        var gradientBar2 = ctx.createLinearGradient(0, 0, 0, 360)
        gradientBar2.addColorStop(0, 'rgba(54, 215, 232, 1)')
        gradientBar2.addColorStop(1, 'rgba(177, 148, 250, 1)')

        var gradientBar3 = ctx.createLinearGradient(0, 0, 0, 300)
        gradientBar3.addColorStop(0, 'rgba(255, 191, 150, 1)')
        gradientBar3.addColorStop(1, 'rgba(254, 112, 150, 1)')

        var gradientdonut1 = ctx.createLinearGradient(0, 0, 0, 181)
        gradientdonut1.addColorStop(0, 'rgba(54, 215, 232, 1)')
        gradientdonut1.addColorStop(1, 'rgba(177, 148, 250, 1)')

        var gradientdonut2 = ctx.createLinearGradient(0, 0, 0, 50)
        gradientdonut2.addColorStop(0, 'rgba(6, 185, 157, 1)')
        gradientdonut2.addColorStop(1, 'rgba(132, 217, 210, 1)')

        var gradientdonut3 = ctx.createLinearGradient(0, 0, 0, 300)
        gradientdonut3.addColorStop(0, 'rgba(254, 124, 150, 1)')
        gradientdonut3.addColorStop(1, 'rgba(255, 205, 150, 1)')


        const newVisitSaleData = {
            labels: ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUI', 'JUL', 'AUO', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [
                {
                    label: "TEMPS MOYEN",
                    borderColor: gradientBar1,
                    backgroundColor: gradientBar1,
                    hoverBackgroundColor: gradientBar1,
                    legendColor: gradientBar1,
                    pointRadius: 0,
                    fill: false,
                    borderWidth: 1,
                    data: [20, 40, 15, 35, 25, 50, 30, 20, 12, 5, 68, 12]
                },

            ]
        }
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
                    gradientdonut1,
                    gradientdonut2,
                    gradientdonut3
                ],
                hoverBackgroundColor: [
                    gradientdonut1,
                    gradientdonut2,
                    gradientdonut3
                ],
                borderColor: [
                    gradientdonut1,
                    gradientdonut2,
                    gradientdonut3
                ],
                legendColor: [
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
        this.setState({visitSaleData: newVisitSaleData, trafficData: newTrafficData})
    }


    toggleProBanner() {
        document.querySelector('.proBanner').classList.toggle("hide");
    }

    render() {
        return (
            <div>

                <div className="page-header">
                    <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span> Dashboard </h3>

                </div>
                <div className="row">
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../../../assets/images/dashboard/circle.svg")}
                                     className="card-img-absolute" alt="circle"/>
                                <h4 className="font-weight-normal mb-3">Vulnérabilités <i
                                    className="mdi mdi-chart-line mdi-24px float-right"></i>
                                </h4>
                                <h2 className="mb-5"> 15,0000</h2>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-info card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../../../assets/images/dashboard/circle.svg")}
                                     className="card-img-absolute" alt="circle"/>
                                <h4 className="font-weight-normal mb-3">Actifs <i
                                    className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                </h4>
                                <h2 className="mb-5">45,6334</h2>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../../../assets/images/dashboard/circle.svg")}
                                     className="card-img-absolute" alt="circle"/>
                                <h4 className="font-weight-normal mb-3">Services <i
                                    className="mdi mdi-chart-line mdi-24px float-right"></i>
                                </h4>
                                <h2 className="mb-5"> 15,0000</h2>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 stretch-card grid-margin">
                        <div className="card bg-gradient-primary card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../../../assets/images/dashboard/circle.svg")}
                                     className="card-img-absolute" alt="circle"/>
                                <h4 className="font-weight-normal mb-3">Tickets <i
                                    className="mdi mdi-diamond mdi-24px float-right"></i>
                                </h4>
                                <h2 className="mb-5">95,5741</h2>
                                <h6 className="card-text">Tickets ouverts</h6>
                                <h6 className="card-text">Tickets fermés</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div className="clearfix mb-4">
                                    <h4 className="card-title float-left">Nombre de tickets par criticité</h4>
                                    <div id="visit-sale-chart-legend"
                                         className="rounded-legend legend-horizontal legend-top-right float-right">
                                        <ul>
                                            <li>
                        <span className="legend-dots bg-primary">
                        </span>Nombre de tickets
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <Bar ref='chart' className="chartLegendContainer" data={this.state.visitSaleData}
                                     options={this.state.visitSaleOptions} id="visitSaleChart"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Nombre de tickets par mois</h4>
                                <Doughnut data={this.state.trafficData} options={this.state.trafficOptions}/>
                                <div id="traffic-chart-legend"
                                     className="rounded-legend legend-vertical legend-bottom-left pt-4">
                                    <ul>
                                        <li>
                                            <span className="legend-dots bg-danger"></span>En attente
                                            <span className="float-right">30%</span>
                                        </li>
                                        <li>
                                            <span className="legend-dots bg-warning"></span>En cours de traitemnt
                                            <span className="float-right">30%</span>
                                        </li>
                                        <li>
                                            <span className="legend-dots bg-info"></span>Traité
                                            <span className="float-right">40%</span>
                                        </li>
                                        <li>
                                            <span className="legend-dots bg-success"></span>Fermé
                                            <span className="float-right">40%</span>
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
                                <h4 className="card-title">Pie Chart</h4>
                                <Pie data={this.state.trafficData} options={this.state.trafficOptions}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Line Chart</h4>
                                <Line data={this.data} options={this.options}/>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="row">
                    <div className="col-xl-7 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Derniers tickets ouverts</h4>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th> #</th>
                                            <th> Name</th>
                                            <th> Due Date</th>
                                            <th> Progress</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td> 1</td>
                                            <td> Herman Beck</td>
                                            <td> May 15, 2015</td>
                                            <td>
                                                <ProgressBar variant="gradient-success" now={25}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> 2</td>
                                            <td> Messsy Adam</td>
                                            <td> Jul 01, 2015</td>
                                            <td>
                                                <ProgressBar variant="gradient-danger" now={75}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> 3</td>
                                            <td> John Richards</td>
                                            <td> Apr 12, 2015</td>
                                            <td>
                                                <ProgressBar variant="gradient-warning" now={90}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> 4</td>
                                            <td> Peter Meggik</td>
                                            <td> May 15, 2015</td>
                                            <td>
                                                <ProgressBar variant="gradient-primary" now={50}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> 5</td>
                                            <td> Edward</td>
                                            <td> May 03, 2015</td>
                                            <td>
                                                <ProgressBar variant="gradient-danger" now={50}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> 5</td>
                                            <td> Ronald</td>
                                            <td> Jun 05, 2015</td>
                                            <td>
                                                <ProgressBar variant="gradient-info" now={65}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title text-white">Todo</h4>
                                <form className="add-items d-flex" onSubmit={this.addTodo}>
                                    <input
                                        type="text"
                                        className="form-control h-auto"
                                        placeholder="What do you need to do today?"
                                        value={this.state.inputValue}
                                        onChange={this.inputChangeHandler}
                                        required/>
                                    <button type="submit"
                                            className="btn btn-gradient-primary font-weight-bold px-lg-4 px-3">Add
                                    </button>
                                </form>
                                <div className="list-wrapper">
                                    <ul className="d-flex flex-column todo-list">
                                        {this.state.todos.map((todo, index) => {
                                            return <ListItem
                                                isCompleted={todo.isCompleted}
                                                changed={(event) => this.statusChangedHandler(event, index)}
                                                key={todo.id}
                                                remove={() => this.removeTodo(index)}
                                            >{todo.task}</ListItem>
                                        })}
                                    </ul>
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
export default DashboardBrightwatch;