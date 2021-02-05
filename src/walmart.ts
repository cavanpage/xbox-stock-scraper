require('chromedriver');
import {Builder, By} from 'selenium-webdriver';
import { log, notify, sleep } from './utitlities';

export const monitorWalMart = async() => {
    const url = 'https://www.walmart.com/ip/Xbox-Series-X/443574645?irgwc=1&sourceid=imp_1aLSaF3F%3AxyLRYawUx0Mo36aUkEWTcXRQ1spz40&veh=aff&wmlspartner=imp_1943169&clickid=1aLSaF3F%3AxyLRYawUx0Mo36aUkEWTcXRQ1spz40&sharedid=&affiliates_ad_id=565706&campaign_id=9383';
    const outOfStockMessage: string = 'out of stock';
    const driver = await new Builder().forBrowser('chrome').build();
  
    try {           
      while(true){
          await driver.get(url);
          log('walmart: checking');
          const bTags = await driver.findElements(By.css('b'));
          const allText = [];
  
          for(let i = 0; i < bTags.length; i++){
            const elementText = await bTags[i].getText();
            allText.push(elementText);
          }
          const statusText: string = await bTags[1].getText();
          const isInStock: boolean = statusText.indexOf(outOfStockMessage) === -1;
  
          if(isInStock){
            notify('walmart: xbox is ' + statusText, allText.join('-'));
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