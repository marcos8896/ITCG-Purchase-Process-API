var server = require('./server');
var ds = server.dataSources.posgresql_ds;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role',
               'Concept', 'Subdirection','Department'//,
              //  'Concept_Requisition',  'Input_output', 
              //  'Input_output_details', 'Provider', 'Purchase_order', 
              //  'Purchase_order_Requisition', 'Requisition', 
              ];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});