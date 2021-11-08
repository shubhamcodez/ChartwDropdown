import React, { Component} from 'react';
import parser from './parser.json' 
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import { store, useGlobalState } from 'state-pool';
import { Line } from 'react-chartjs-2';
import './Chart.css';


const options = parser.pool_names;
const amp_values = parser.amplification_values;
const genes = parser.gene_names; 
const predicted_results = parser.predicted_pool_ct_values;

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

for(var j = 0; j < genes.length; j++)
{ 
  datasets[j] = {label:genes[j],data:amp_values[j][0],fill:false, backgroundColor: colors[j%colors.length], borderColor: bdcolor[j%bdcolor.length]}
}

store.setState("data", datasets);

const GetpoolData = (props) =>{
  var [data, setData] = useGlobalState("data");
  var pool;
  
  for(var m = 0 ; m < options.length; m++)
  {if(props.Value === options[m]){pool = m;}}
  
  for(var j = 0; j < genes.length; j++)
  {datasets[j] = {label:genes[j],data:amp_values[j][pool],fill:false, backgroundColor: colors[j%colors.length], borderColor: bdcolor[j%bdcolor.length]}}
  
  setData(datasets);
  return(<h1 className='pool-select'>Rendering chart for pool: {props.Value}</h1>)
};

function getData(datasets)
{
  const data = {
    labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
    datasets: datasets,}
  return data;
}

var GiveResults = (props) =>
{
  var Result = props.results;
  var r1 = Result[0],r2 = Result[1] ,r3 = Result[2],r4 = Result[3];
  return(
  <div>
  <h2>Predicted CT Values:</h2>
      <p className= "resultbox">
      <b className = "displayResults" contentEditable={true}>{r1}</b>
      <b className = "displayResults" contentEditable={true}>{r2}</b>
      <b className = "displayResults" contentEditable={true}>{r3}</b>
      <b className = "displayResults" contentEditable={true}>{r4}</b></p>
  </div>
  ) 
}

class RenderGraph extends Component {
  constructor (props) {
    super(props)
    this.state = {selected: '',value:''}
    this._onSelect = this._onSelect.bind(this)
  }
  _onSelect (option) {
    this.setState({selected: option})
    console.log(options)
    console.log(option)
    console.log(predicted_results)
    this.setState({value: predicted_results[options.indexOf(option.value)]})
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
        <GiveResults results = {this.state.value}/>
        {console.log(this.state.value)}
       </div>
      </section>
    )
  }
}
export default RenderGraph;