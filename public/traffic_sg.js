import { VisSchemasProvider } from 'ui/vis/schemas';
import { TemplateVisTypeProvider } from 'ui/template_vis_type/template_vis_type';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

import 'plugins/traffic_sg/traffic_sg.less';
import 'plugins/traffic_sg/traffic_sg_controller';

VisTypesRegistryProvider.register(function MetricVisProvider(Private) {
  var TemplateVisType = Private(TemplateVisTypeProvider);
  var Schemas = Private(VisSchemasProvider);

  return new TemplateVisType({
    name: 'traffic',
    title: 'Traffic',
    description: 'Chart display lights of a standard color green/yellow/red',
    icon: 'fa-thumbs-up',
    template: require('plugins/traffic_sg/traffic_sg.html'),
    params: {
      defaults: {
        titleTraffic: null,
        fontSize: 60,
        width: 50,
        redThreshold: 20,
        greenThreshold: 80,
        invertScale: null,
        handleNoResults: true
      },
      editor: require('plugins/traffic_sg/traffic_sg_params.html')
    },
    hierarchicalData: function (vis) {
      return Boolean(true);
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 1,
        max: 1,
        defaults: [
          { type: 'count', schema: 'metric' }
        ]
      },
      {
        group: 'buckets',
        name: 'segment',
        title: 'X-Axis',
        min: 0,
        max: 1,
        aggFilter: ['terms']
      }
    ])
  });
});