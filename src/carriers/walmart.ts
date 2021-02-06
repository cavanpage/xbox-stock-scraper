require('chromedriver');
import { By } from 'selenium-webdriver';
import { createWebDriver, log, notify, sleep } from '../utilities/utilities';

export const monitorWalMart = async() => {
    const url = 'https://www.walmart.com/ip/Xbox-Series-X/443574645?irgwc=1&sourceid=imp_1aLSaF3F%3AxyLRYawUx0Mo36aUkEWTcXRQ1spz40&veh=aff&wmlspartner=imp_1943169&clickid=1aLSaF3F%3AxyLRYawUx0Mo36aUkEWTcXRQ1spz40&sharedid=&affiliates_ad_id=565706&campaign_id=9383';
    const driver = await createWebDriver();
  
    try {           
      while(true){
          log('walmart: checking');
          await driver.get(url);
          const bTags = await driver.findElements(By.css('b'));
          const statusText: string = await bTags[1].getText();
          const isInStock: boolean = statusText.indexOf('out of stock') === -1;
  
          if(isInStock){
            notify('walmart: in stock', url, true, true);
            log('walmart: in stock')
          }else{
            log('walmart: out of stock')
          }
          await sleep(500000);
      }
    }
    catch(e){
      log({'walmart:error': e});
    } finally {
      await driver.quit();
    }
}