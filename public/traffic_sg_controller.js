import { AggResponseTabifyProvider } from 'ui/agg_response/tabify/tabify';
import { uiModules } from 'ui/modules';

const module = uiModules.get('kibana/colored-metric', ['kibana']);
module.controller('KbnTrafficVisController', function ($scope, Private) {
  var tabifyAggResponse = Private(AggResponseTabifyProvider);
  var metrics = $scope.metrics = [];
  var title = null;

  $scope.processTableGroups = function (tableGroups) {
    tableGroups.tables.forEach(function (table) {
      table.columns.forEach(function (column, i) {
        var fieldFormatter = table.aggConfig(column).fieldFormatter();
        metrics[0] = {label: column.title, value: table.rows[0][i]};	
      });
    });
  };

  $scope.$watch('esResponse', function (resp) {
    if (resp) {
      metrics.length = 0;
      $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
      title = ( !$scope.vis.params.titleTraffic ) ? $scope.metrics[0].label : $scope.vis.params.titleTraffic;
      $scope.title = title;
    }
  });
});