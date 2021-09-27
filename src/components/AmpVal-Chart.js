import React from 'react';
import '../App.css';
import './Chart.css';
import RenderGraph from './RenderGraph';

export default function MainChart() {
  return (
  <div>
      <div className = 'graph'>
      <RenderGraph/>
      </div>
  </div>);
}