import { monitorNewegg } from './newegg';
import { notify } from './utitlities';
import { monitorWalMart } from './walmart';

notify('Application Started');

try{
  monitorNewegg();
  monitorWalMart();
}
catch(e){
  notify('Application Stopped');
}

