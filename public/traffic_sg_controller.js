class TrafficSgController {
  constructor(el, vis) {
    this.el = el;
    this.vis = vis;
    this.container = document.createElement('div');
    this.container.className = 'traffic-vis';
    this.el.appendChild(this.container);
    this.metricValue = null;
  }

  render(visData, status) {
    this.container.innerHTML = '';
    const table = visData.tables[0];
    const metrics = [];
    let bucketAgg;

    table.columns.forEach((column, i) => {
      table.rows.forEach(row => {
        const value = row[i];
        metrics.push({
          title: bucketAgg ? `${row[0]} ${column.title}` : column.title,
          value: row[i],
          formattedValue: column.aggConfig ? column.aggConfig.fieldFormatter('text')(value) : value,
          bucketValue: bucketAgg ? row[0] : null,
          aggConfig: column.aggConfig
        });
      });
    });

    metrics.forEach(metric => {
      this.metricValue = metric.formattedValue;
      let width = this.vis.params.width;
      let height = 2.68 * this.vis.params.width;
      this.container.innerHTML = '';
      const trafficContainerDiv = document.createElement(`div`);
      trafficContainerDiv.className = 'traffic-vis traffic-container';

      let trafficLightContainerDiv = document.createElement(`div`);
      trafficLightContainerDiv.className = 'traffic-vis traffic-light-container';
      trafficLightContainerDiv.setAttribute('style', `width: ${width}px; height: ${height}px`);

      let trafficLightDiv = document.createElement(`div`);
      trafficLightDiv.className = 'traffic-vis traffic-light-container traffic-light light'

      let redLightDiv = document.createElement('div');
      redLightDiv.className = `light red ${this.redLightStatus()}`;

      let yellowLightDiv = document.createElement('div');
      yellowLightDiv.className = `light yellow ${this.yellowLightStatus()}`;

      let greenLightDiv = document.createElement('div');
      greenLightDiv.className = `light green ${this.greenLightStatus()}`;

      trafficLightDiv.appendChild(redLightDiv);
      trafficLightDiv.appendChild(yellowLightDiv);
      trafficLightDiv.appendChild(greenLightDiv);
      trafficLightContainerDiv.appendChild(trafficLightDiv);
      trafficContainerDiv.appendChild(trafficLightContainerDiv);

      this.container.appendChild(trafficContainerDiv);
    });

    return new Promise(resolve => {
      resolve('Done rendering');
    })
  }

  destroy() {
    this.el.innerHTML = '';
    console.log('Destroying');
  }

  redLightStatus() {
    let onValue = this.metricValue <= this.vis.params.redThreshold && !this.vis.params.invertScale;
    let invertValue = this.metricValue >= this.vis.params.redThreshold && this.vis.params.invertScale;
    return (onValue || invertValue) ? 'on' : '';
  }

  yellowLightStatus() {
    let onValue = this.metricValue > this.vis.params.redThreshold && this.metricValue < this.vis.params.greenThreshold && !this.vis.params.invertScale;
    let invertValue = this.vis.params.redThreshold > this.metricValue && this.metricValue > this.vis.params.greenThreshold && this.vis.params.invertScale;
    return (onValue || invertValue) ? 'on' : '';
  }

  greenLightStatus() {
    let onValue = this.metricValue >= this.vis.params.greenThreshold && !this.vis.params.invertScale;
    let invertValue = this.metricValue <= this.vis.params.greenThreshold && this.vis.params.invertScale;
    return (onValue || invertValue) ? 'on' : '';
  }
};

export { TrafficSgController };