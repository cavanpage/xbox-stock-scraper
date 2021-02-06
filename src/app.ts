import { monitorGamestop, monitorNewegg, monitorWalMart } from './carriers';
import { config } from './config';
import { notify } from './utilities';

notify('Application Started');

try{
  monitorGamestop();
  monitorNewegg();
  monitorWalMart();
}
catch(e){
  notify('Application Stopped');
}

