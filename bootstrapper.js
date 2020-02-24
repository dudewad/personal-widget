var search = window.location.search;
var params = {};
var head = document.querySelector('head');
var script = document.createElement('script');
var version = 'latest';
var src;
var apiKey;
var instance = 'blue.';
var instanceName = 'blue';

if (search.length) {
  search = search.substring(1);
  var props = search.split('&');

  props.forEach(function (item) {
    var items = item.split('=');
    params[items[0]] = items[1];
  });
}
if (params['v']) {
  version = params['v'];
}
if (params['apiKey']) {
  apiKey = params['apiKey'];
  console.log(`Using custom API key "${apiKey}"`);
}
if (params['instance']) {
  instanceName = params['instance'] === 'blue' ? 'blue' : 'green';
  instance = instanceName === 'blue' ? 'blue.' : '';
}

if (params.hasOwnProperty('prod')) {
  console.log(`Running ${instanceName} prod with widget version "${version}"`);
  src = `https://${instance}medchatapp.com/v1/widget.js?api-key=${apiKey ? apiKey : '3d20bUn6EEa8r2UIxq4Jmg'}&v=${version}`;
} else if (params.hasOwnProperty('pr')) {
  var pr = params['pr'];
  console.log(`Running ${instanceName} dev PR branch "${pr}" with widget version "${version}"`);
  src = `https://${instance}dev.medchatapp.com/pr/${pr}/apps/widget/widget.js?api-key=${apiKey ? apiKey : 'N4DRtiIZYkGqPWr_PZb48w'}&v=${version}`;
} else {
  console.log(`Running ${instanceName} dev with widget version "${version}"`);
  src = `https://${instance}dev.medchatapp.com/v1/widget.js?api-key=${apiKey ? apiKey : 'N4DRtiIZYkGqPWr_PZb48w'}&v=${version}`;
}

script.src = src;
head.appendChild(script);

function QsDescriptor(type, description) {
  return {type, description}
}

var qsDescriptors = {
  apiKey: new QsDescriptor('string', 'Use an api different from the default-configured one for the selected environment.'),
  v: new QsDescriptor('string', 'Use a specific version. Defaults to `latest`.'),
  pr: new QsDescriptor('string', 'Environment selector: use a PR branch environment. This is a dev environment based off a specific PR.'),
  prod: new QsDescriptor('void', 'Environment selector: use the prod environment.'),
  instance: new QsDescriptor('void', 'Environment instance selector: use `blue` or `green` to pick. Defaults to `blue`.'),
};

console.groupCollapsed('Available qs params for configuration:');
console.table(qsDescriptors);
console.log('Note that any environment other than those listed here will point to dev.');
console.groupEnd();