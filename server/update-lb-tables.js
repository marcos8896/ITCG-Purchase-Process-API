var server = require('./server');

var ds = server.dataSources.posgresql_ds;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role',
'Concept', 'Subdirection','Department',
'Concept_Requisition',  'Input_output', 
'Input_output_details', 'Provider', 'Purchase_order', 
'Purchase_order_Requisition', 'Requisition', 'Project', 'Program',
'Budget_key', 'Budget_key_details', 'Boss_department', 'Vice_principal',
'Planning'
];

              
ds.autoupdate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] updated in ', ds.adapter.name);
  ds.disconnect();
});