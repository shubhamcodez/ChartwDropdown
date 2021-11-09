import React from 'react';
import '../App.css';
import './Chart.css';
import RenderGraph from './RenderGraph';

export default function MainChart() {
  return (
  <div>
      <div className = 'graph'>
      <h1>Amplification plot</h1>
      <RenderGraph/>
      </div>
  </div>);
}