import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';

import './traffic_sg.less';
import optionsTemplate from './traffic_sg_params.html';
import { TrafficSgController } from 'trafic_sg_controller';

const TrafficSgVisualization = (Private) => {
  const VisFactory = Private(VisFactoryProvider);
  const Schemas = Private(VisSchemasProvider);

  return VisFactory.createBaseVisualization({
    name: 'traffic',
    title: 'Traffic',
    icon: 'fa-thumbs-up',
    category: CATEGORY.OTHER,
    description: 'Chart display lights of a standard color green/yellow/red',
    visualization: TrafficSgController,
    visConfig: {
      defaults: {
        titleTraffic: null,
        fontSize: 60,
        width: 50,
        redThreshold: 20,
        greenThreshold: 80,
        invertScale: null,
        handleNoResults: true
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
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
        }
      ])
    }
  });
};

VisTypesRegistryProvider.register(TrafficSgVisualization);