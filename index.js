var palette = { 'sky': '#E5B1A6', 'astro': '#FBDAD3',
                'cl0': '#D2878E', 'cw0': '#F3A0F2',
                'cl1': '#BF6986', 'cw1': '#E089EC',
                'cl2': '#98398B', 'cw2': '#AA68C8',
                'cl3': '#7A2684', 'cw3': '#704BA7',
                'cl4': '#5B1C83', 'cw4': '#805BB9',
                'cl5': '#47235E', 'cw5': '#5E3C92'
              },
    width = 270*3,
    height = 350*3,
    cradius = 10*3,
    sradius = 3.5,
    bwidth = width/3.2,
    bheight = height/1.3,
    numBuildings = 8;

var svg = d3.select('svg')
  .attr('height', height)
  .attr('width', width);

var sky = svg.append('rect')
  .attr('class', '.sky')
  .attr('height', height)
  .attr('width', width)
  .attr('fill', palette['sky']);

var moon = svg.append('circle')
  .attr('class', '.moon')
  .attr('cx', (width/2)-cradius-50)
  .attr('cy', height/5)
  .attr('r', cradius)
  .attr('fill', palette['astro']);

var starsBasic = svg.append('g')
  .selectAll('.starbasic')
  .data(getRandomData(15, 0)).enter()
  .append('circle')
  .attr('class', 'starbasic')
  .attr('cx', function(d) { return getRandomNum(sradius, (width-sradius)); })
  .attr('cy', function(d) { return getRandomNum(sradius, (height/3)); })
  .attr('r', function(d) { return getRandomNum(sradius-2, sradius); })
  .attr('fill', palette['astro']);

var layerBase = [],
    widths = [],
    xy = [],
    group,
    buildingAndWindow;
var cityLayerY = [3, 2.5, 2, 1.5, 1.3, 1.15];

var cityLayerData = [];
for(var i = 0; i < numBuildings; i++) {
  // [width, height, x, y]
  cityLayerData.push({});
}

for(var i = 0; i < 6; i++) {

  switch(i) {
    case 0:
      cityBridge(i);
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      layer3Bridge(i);
      break;
    case 4:
      break;
    case 5:
      layer5Bridge(i);
      break;
    
    default:
      break;
  }

  group = svg.append('g');

  buildingAndWindow = group.selectAll('.cl'+i)
    .data(cityLayerData).enter()
    .append('g');

  buildingAndWindow.append('rect')
    .attr('class', 'cl'+i )
    .attr('width', function(d, j) {
      d['width'] = d3.randomUniform(bwidth/2.5, (bwidth))(); 
      return d['width']; })
    .attr('height', function(d, j) {
      d['height'] = d3.randomUniform(bheight/5, (bheight/2.5))();
      return d['height'];
    })
    .attr('x', function(d, j) {
      d['x'] = getRandomNum(0, width);
      return d['x'];
    })
    .attr('y', function(d, j) {
      d['y'] = (height/cityLayerY[i])+((bheight/2.5)-d['height']);
      layerBase.push(d['height']);
      return d['y'];
    })
    .attr('fill', palette['cl'+i]);

  // inner loop for windows
  threeHorizontalWindows(buildingAndWindow);

  group.append('rect')
    .attr('x', 0)
    .attr('y', function(d, j) {
      return (height/cityLayerY[i])+((bheight/2.5)-layerBase[j])+170;
    })
    .attr('width', width)
    .attr('height', 1000)
    .attr('fill', palette['cl'+i]);
}

//////////////// Construct Windows ////////////////////////////////////////////

function threeHorizontalWindows(building) {
  for(var k = 0; k < 3; k++) {
    building.append('rect')
      .attr('class', 'cw'+i)
      .attr('x', function(d, j) { return d['x']+5; })
      .attr('y', function(d, j) { d['y'] = d['y']+30; return d['y']; })
      .attr('width', function(d, j) { return d['width']-10; })
      .attr('height', 10)
      .attr('fill', palette['cw'+i]);
  }
}

//////////////// Construct Bridges ////////////////////////////////////////////

function cityBridge(layerIndex) {
  var fill = 'slategrey';
  var svg = d3.select('svg');
  var bridge = svg.append('g')
    .attr('class', 'cityBridge')
    .attr('fill', fill);

  var origin = 0,
      roadWidth = 500,
      cityBridgeHeight = 1050/2;

  for(var i = 0; i < 5; i++) {
    var supportCol = bridge.append('rect')
      .attr('x', origin+(i*roadWidth))
      .attr('y', cityBridgeHeight)
      .attr('width', 15)
      .attr('height', 500);
    
    var road = bridge.append('rect')
      .attr('x', origin+(i*roadWidth))
      .attr('y', cityBridgeHeight)
      .attr('width', roadWidth)
      .attr('height', 10);
  }

  var pier = bridge.append('rect')
    .attr('x', origin+(roadWidth/2))
    .attr('y', cityBridgeHeight-100)
    .attr('width', 15)
    .attr('height', 550);

  var tower = bridge.append('rect')
    .attr('x', origin+(roadWidth/2)+1.5)
    .attr('y', cityBridgeHeight-260)
    .attr('width', 12)
    .attr('height', 200);
    
  var towerTop = bridge.append('rect')
    .attr('x', origin+(roadWidth/2))
    .attr('y', cityBridgeHeight-275)
    .attr('width', 15)
    .attr('height', 16);

  var towerLight = bridge.append('circle')
    .attr('cx', origin+(roadWidth/2)+7.5)
    .attr('cy', cityBridgeHeight-277)
    .attr('r', 5)
    .attr('fill', 'white')

  cableOrigin = tower.attr('x');
  var mainCableLeft1 = bridge.append('path')
    .attr('stroke-width', '2')
    .attr('d', 'M'+cableOrigin+' '+tower.attr('y')+' q 0 15 -'+(roadWidth)+' '+cityBridgeHeight/2)
    .attr('fill', 'none')
    .attr('stroke', 'slategrey');

  var mainCableRight1 = bridge.append('path')
    .attr('stroke-width', '2')
    .attr('d', 'M'+(parseInt(cableOrigin)+10).toString()+' '+tower.attr('y')+' q 0 15 '+(roadWidth+(roadWidth/2))+' '+cityBridgeHeight/2)
    .attr('fill', 'none')
    .attr('stroke', 'slategrey');

  var fill = 'slategrey';
  var svg = d3.select('svg');
  var bridge = svg.append('g')
    .attr('class', 'cityBridge')
    .attr('fill', fill);

  var origin = 0,
      roadWidth = 500,
      cityBridgeHeight = 1050/2;

  for(var i = 0; i < 5; i++) {
    var supportCol = bridge.append('rect')
      .attr('x', origin+(i*roadWidth))
      .attr('y', cityBridgeHeight)
      .attr('width', 15)
      .attr('height', 500);
    
    var road = bridge.append('rect')
      .attr('x', origin+(i*roadWidth))
      .attr('y', cityBridgeHeight)
      .attr('width', roadWidth)
      .attr('height', 10);
  }
  var towerBase = bridge.append('rect')
    .attr('x', origin+(roadWidth/2))
    .attr('y', cityBridgeHeight-100)
    .attr('width', 15)
    .attr('height', 550);

  var tower = bridge.append('rect')
    .attr('x', origin+(roadWidth/2)+1.5)
    .attr('y', cityBridgeHeight-260)
    .attr('width', 12)
    .attr('height', 200);
    
  var towerCap = bridge.append('rect')
    .attr('x', origin+(roadWidth/2))
    .attr('y', cityBridgeHeight-275)
    .attr('width', 15)
    .attr('height', 16);

  var towerLight = bridge.append('circle')
    .attr('cx', origin+(roadWidth/2)+7.5)
    .attr('cy', cityBridgeHeight-277)
    .attr('r', 5)
    .attr('fill', 'white')

  cableOrigin = tower.attr('x');
  var mainCableLeft1 = bridge.append('path')
    .attr('stroke-width', '2')
    .attr('d', 'M'+cableOrigin+' '+tower.attr('y')+' q 0 15 -'+(roadWidth)+' '+cityBridgeHeight/2+' L '+(roadWidth+(roadWidth/2))+' '+cityBridgeHeight+' '+tower.attr('x')+' '+cityBridgeHeight+' '+(parseInt(cableOrigin)+10).toString()+' '+tower.attr('y'))
    .attr('fill', 'url(#suspenderCables)')
    .attr('stroke', 'slategrey');

  var mainCableRight1 = bridge.append('path')
    .attr('stroke-width', '2')
    .attr('d', 'M'+(parseInt(cableOrigin)+10).toString()+' '+tower.attr('y')+' q 0 15 '+(roadWidth+(roadWidth/2))+' '+cityBridgeHeight/2+' L '+(roadWidth+(roadWidth/2))+' '+cityBridgeHeight+' '+tower.attr('x')+' '+cityBridgeHeight+' '+(parseInt(cableOrigin)+10).toString()+' '+tower.attr('y'))
    .attr('fill', 'url(#suspenderCables)')
    .attr('stroke', 'slategrey');

  var defs = svg.append('defs');

  cableCoordinates = [];
  for(var k = 0; k < 12; k++) {
    cableCoordinates.push(
      'M '+
      (20+(k*2*10)).toString()+' 0 '+
      (50+(k*2*10)).toString()+' 5000 ');
  }

  var suspenderCablesPattern = defs.append('pattern')
    .attr('id', 'suspenderCables')
    .attr('width', tower.attr('x'))
    .attr('height', cityBridgeHeight)
    .attr('patternUnits', 'userSpaceOnUse');
  suspenderCablesPattern.selectAll('path')
    .data(cableCoordinates).enter()
    .append('path')
    .attr('stoke-width', '1')
    .attr('stroke', 'slategrey')
    .attr('d', function(d) { return d; });

}

function layer3Bridge(layerIndex) {
  var svg = d3.select('svg');
  var bridge = svg.append('g')
    .attr('class', 'layerThreeBridge')
    .attr('fill', palette['cl'+layerIndex]);

  var origin = 0,
      roadWidth = 100
      layer3BridgeHeight = height-300;
      
  for(var i = 0; i < 10; i++) {
    var supportCol = bridge.append('rect')
      .attr('x', origin+(i*roadWidth))
      .attr('y', layer3BridgeHeight)
      .attr('width', 10)
      .attr('height', 500);

    var colBase1 = bridge.append('rect')
      .attr('x', origin+(i*roadWidth)-7)
      .attr('y', layer3BridgeHeight)
      .attr('width', 25)
      .attr('height', 20);

    var colBase2 = bridge.append('rect')
      .attr('x', origin+(i*roadWidth)-5)
      .attr('y', layer3BridgeHeight)
      .attr('width', 20)
      .attr('height', 30);

    var road = bridge.append('rect')
      .attr('x', origin+(i*roadWidth))
      .attr('y', layer3BridgeHeight)
      .attr('width', roadWidth)
      .attr('height', 15);
  }

  var trainGroup = bridge.append('g')
    .attr('class', 'layerThreeBridge layerThreeTrain')

  var train = trainGroup.append('rect')
    .attr('class', 'layerThreeBridge layerThreeTrain')
    .attr('x', width)
    .attr('y', layer3BridgeHeight-15)
    .attr('width', roadWidth*4)
    .attr('height', 15)
    .attr('rx', '15')
    .attr('ry', '115')
    .attr('fill', 'slateblue');

  var trainWindow, animateWindows, xPosition;
  var trainDestination = -1000,
    trainDuration = '7s';
  for(var j = 0; j < 33; j++) {
    xPosition = width+3+(j*12);
    trainWindow = trainGroup.append('rect')
      .attr('class', 'layerThreeBridge layerThreeTrainWindows')
      .attr('x', xPosition)
      .attr('y', layer3BridgeHeight-10)
      .attr('width', 9)
      .attr('height', 5)
      .attr('fill', 'white');
    animateWindows =  trainWindow.append('animate')
    .attr('attributeName', 'x')
    .attr('from', trainWindow.attr('x'))
    .attr('to', trainDestination+3+(j*12))
    .attr('dur', trainDuration)
    .attr('repeatCount', 'indefinite')
  }

  // trainWindow = trainGroup.append('line')
  //   .attr('class', 'layerThreeBridge layerThreeTrainWindows')
  //   .attr('x1', width)
  //   .attr('y1', layer3BridgeHeight-10)
  //   .attr('x2', roadWidth/4)
  //   .attr('y2', layer3BridgeHeight-10)
  //   .attr('stroke-dasharray', '9, 3')
  //   .attr('stroke-width', '5')
  //   .attr('stroke', 'white')

  // animateWindows =  trainWindow.append('animate')
  //   .attr('attributeName', 'x1')
  //   .attr('from', width)
  //   .attr('to', trainDestination)
  //   .attr('dur', trainDuration)
  //   .attr('repeatCount', 'indefinite')

  

  var animateTrain = train.append('animate')
    .attr('attributeName', 'x')
    .attr('from', width)
    .attr('to', trainDestination)
    .attr('dur', trainDuration)
    .attr('repeatCount', 'indefinite')

}

function layer5Bridge(layerIndex) {
  var y = height - 370 + 200
  var svg = d3.select('svg');
  var bridge = svg.append('g')
    .attr('class', 'layer5Bridge')
    .attr('fill', palette['cl'+layerIndex]);

  var colX = 1,
      roadWidth = 60,
      roadX = roadWidth*(-1);
  for(var i = 0; i < 15; i++) {
    var supportCol = bridge.append('rect')
      .attr('width', 5)
      .attr('height', 125)
      .attr('x', colX+(i*roadWidth))
      .attr('y', y+75)
      
    var colTop = bridge.append('rect')
      .attr('width', 2)
      .attr('height', 45)
      .attr('x', colX+(i*roadWidth)+1.5)
      .attr('y', y+30)
      
    var colMid = bridge.append('rect')
      .attr('width', 3)
      .attr('height', 40)
      .attr('x', colX+(i*(roadWidth)-0.5+(roadWidth/2)))
      .attr('y', y+73)

    var colBase = bridge.append('rect')
      .attr('width', 10)
      .attr('height', 5)
      .attr('x', colX+(i*roadWidth)-2.5)
      .attr('y', y+122)
      
    var road = bridge.append('rect')
      .attr('width', 70)
      .attr('height', 22)
      .attr('x', roadX+(i*roadWidth))
      .attr('y', y+100)
    
    var railingTop = bridge.append('rect')
      .attr('width', 70)
      .attr('height', 2)
      .attr('x', roadX+(i*roadWidth))
      .attr('y', y+93)

    var light = bridge.append('circle')
      .attr('cx', ((i*roadWidth)+(roadWidth/2)+2))
      .attr('cy', y+35)
      .attr('r', 4)
      .attr('fill', 'white')

    var topRight = bridge.append('path')
      .attr('stroke-width', 2)
      .attr('d', 'M'+((i*roadWidth)+(roadWidth/2)+2)+' '+(y+75).toString()+' L'+((i*roadWidth)+(roadWidth/2)+2)+' '+(y+35).toString())
      .attr('stroke', palette['cl'+layerIndex]);

    var topTop = bridge.append('path')
      .attr('stroke-width', 2)
      .attr('d', 'M'+((i*roadWidth)+3)+' '+(y+31).toString()+' q 30 -20 60 0')
      .attr('stroke', palette['cl'+layerIndex])
      .attr('fill', 'none')
    }

    for(var j = 0; j < 200; j++) {
      var railings = bridge.append('rect')
        .attr('width', 2)
        .attr('height', 7)
        .attr('x', 0+(j*5))
        .attr('y', y+93)
    }
}

//////////////// Helper functions /////////////////////////////////////////////

function getRandomNum(min, max) {
  return Math.random() * max | min;
}

function getRandomData(max, data) {
  var dataset = [];
  for(var i = 0; i < max; i++) {
    dataset.push(data);
  }
  return dataset;
}
