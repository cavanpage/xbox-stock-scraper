require('chromedriver');
import {Builder, By} from 'selenium-webdriver';
import { log, notify, sleep } from './utitlities';

export const monitorNewegg = async() => {
    const url: string = 'https://www.newegg.com/p/N82E16868105273';
    const outOfStockMessage: string = "OUT OF STOCK";
    const driver = await new Builder().forBrowser('chrome').build();
    try{
      while(true){
        await driver.get(url);
        log('newegg: checking');
        const stockTags = await driver.findElements(By.css('.product-inventory > strong'));

        const statusText: string = await stockTags[0].getText();
        const isInStock: boolean = statusText.indexOf(outOfStockMessage) === -1;

        if(isInStock){
            const message: string = 'newegg: xbox is ' + statusText;
            notify(message, message)
            log('newegg: in stock')
        }else{
          log('newegg: out of stock')
        }
        await sleep(30000);
    }
  }
  catch(e){
  log({'newegg:error': e});
  } finally {
  await driver.quit();
  }
}