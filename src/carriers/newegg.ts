require('chromedriver');
import { By } from 'selenium-webdriver';
import { createWebDriver, log, notify, sleep } from '../utilities';

export const monitorNewegg = async() => {
    const url: string = 'https://www.newegg.com/p/N82E16868105273';
    const driver = await createWebDriver();

    try{
      while(true){
        log('newegg: checking');
        await driver.get(url);
        const stockTags = await driver.findElements(By.css('.product-inventory > strong'));
        const statusText: string = await stockTags[0].getText();
        const isInStock: boolean = statusText.indexOf("OUT OF STOCK") === -1;

        if(isInStock){
            notify('newegg: in stock', url, true)
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