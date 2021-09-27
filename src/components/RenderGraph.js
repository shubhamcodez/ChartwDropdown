import React, { Component } from 'react';
import parser from './parser.json' 
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import { store, useGlobalState } from 'state-pool';
import { Line } from 'react-chartjs-2';
import './Chart.css';

const options = parser.pool_listed;
const amp_values = parser.amp_values;
const genes = parser.gene_names; 
const predicted_results = parser.predicted_ct_values;

const colors = ['rgb(255,195,0)','rgb(32,243,31)','rgb(31,243,232)', 'rgb(238,31,243)'];
const bdcolor = ['rgba(255,195,0,0.3)','rgba(32,243,31,0.3)','rgba(31,243,232,0.3)', 'rgba(238,31,243,0.3)'];

const Graphoptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          suggestedMax:9000,
          max: 9000 
        },
      },
    ],
    xAxes: {
      display: true
    },
  },
};

var datasets = [];
for(var j = 0; j < 4; j++)
{datasets[j] = {label:genes[j],data:amp_values[j][0],fill:false, backgroundColor: colors[j%colors.length], borderColor: bdcolor[j%bdcolor.length]}}


store.setState("data", datasets);
store.setState("Results", []);

const GetpoolData = (props) =>{
  var [data, setData] = useGlobalState("data");
  var [Results, setResult] = useGlobalState("Results");
  var pool;
  
  for(var m = 0 ; m < 79; m++)
   {if(props.Value === options[m]){pool = m;}}
  for(var j = 0; j < 4; j++)
  {datasets[j] = {label:genes[j],data:amp_values[j][pool],fill:false, backgroundColor: colors[j%colors.length], borderColor: bdcolor[j%bdcolor.length]}}
  
  setData(datasets);
  setResult(predicted_results[pool]);
  return(<h1 className='pool-select'>Rendering chart for pool: {props.Value}</h1>)
};

function getData(datasets)
{
  const data = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
    datasets: datasets,}
  return data;
}

var GiveResults = (props) =>
{
  return(<h2>{props.Results+" "}</h2>)
}

class RenderGraph extends Component {
  constructor (props) {
    super(props)
    this.state = {selected: ''}
    this._onSelect = this._onSelect.bind(this)
  }
  _onSelect (option) {
    this.setState({selected: option})
  }  
  render () {
    const defaultOption = this.state.selected;
    const selectedValue = typeof this.state.selected === 'string' ? defaultOption : this.state.selected.label;
    return (
      <section>
        <div className= 'Graph'>
        <h3 className = 'drop-header' >Select pool name: </h3>
        <Dropdown className = 'Dropdown' options={options} onChange={this._onSelect} value={selectedValue} placeholder="Select an option"/>
        <GetpoolData className='select' Value = {selectedValue}/>
        <Line className="chart" data={getData(store.value.data.value)} options={Graphoptions} height='400' width='700'/>
        <GiveResults Results = {store.value.Results.value}/>
        {console.log(store.value.Results)}
       </div>
      </section>
    )
  }
}
export default RenderGraph;