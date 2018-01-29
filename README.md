
kibana-plugin-traffic
=====================

![screenshot](./screenshot.png)


Note
-------------
The original plugin at https://github.com/sbeyn/kibana-plugin-traffic-sg, works only for Kibana vrsions 5.4.x and before. After v.5.5.0, Kibana moved to imports. The original code is available in branch 5.4.x here, for 5.5.x+, the code is available in branch 5.6.x.

The master branch is for Kibana 6.x.x.


Introduction
-------------

This plugin allows you to create a Traffic light visualization in Kibana with threshold values for 3 colors.

Content
-------
```
.
├── index.js
├── package.json
├── public
│   ├── traffic_sg_controller.js
│   ├── traffic_sg.html
│   ├── traffic_sg.js
│   ├── traffic_sg.less
│   └── traffic_sg_params.html
└── README.md
```


Installation
------------

To install the plugin for Kibana 4.x:
```
        $ cd <path>/kibana/installedPlugins
        $ git clone -b 4.x <depot> traffic-sg
```

To install the plugin for Kibana < 5.5.x:
```
        $ cd <path>/kibana/plugins
        $ git clone -b 5.4.x <depot> traffic-sg
```

To install the plugin for Kibana >= 5.5.x:
```
        $ cd <path>/kibana/plugins
        $ git clone -b 5.6.x <depot> traffic-sg
```

To install the plugin for Kibana 6.x:
```
        $ cd <path>/kibana/plugins
        $ git clone <depot> traffic-sg
```

Uninstalling
---------------

```
        $ bin/kibana plugin  --remove traffic_sg
```