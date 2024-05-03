import { PlaywrightBrowser } from '../browser';
import { parseError } from '../Error';
import { sleep } from '../util';

export class GithubClient {
  #GIT_USER: string;
  #GIT_PASS: string;

  #debug: boolean;
  #browser: PlaywrightBrowser;

  public constructor(debug = false) {
    this.#GIT_USER = process.env.GIT_USER || '';
    this.#GIT_PASS = process.env.GIT_PASS || '';

    this.validateCredentials();

    this.#debug = debug;
    this.#browser = new PlaywrightBrowser();
  }

  private validateCredentials(): void{
    try {
      if (
        this.#GIT_USER === '__YOUR_GITHUB_USERNAME__' ||
        this.#GIT_PASS === '__YOUR_GITHUB_PASSWORD__'
      ) {
        throw new Error('Please provide valid GitHub credentials.');
      }
    } catch (err) {
      parseError(err);

      console.log();
      console.log('+----------------------------------------------------+');
      console.log('|   Please fix .env to add your github credentials   |');
      console.log('+----------------------------------------------------+');
      process.exit(1);
    }
  }

  private log(content) {
    if (this.#debug) {
      console.log(`[Debug] - ${content}`);
    }
  }

  public async init(): Promise<void>{
    this.log('Opening browser');
    await this.#browser.open();
    this.log('Browser opened');
  }

  public async login(): Promise<void>{
    this.log('Logging in');
    await this.#browser.page.goto(`https://github.com/${this.#GIT_USER}`);
    await this.#browser.page.click('.HeaderMenu-link--sign-in');
    await this.#browser.page.fill('#login_field', this.#GIT_USER);
    await this.#browser.page.fill('#password', this.#GIT_PASS);
    await this.#browser.page.click('input[type="submit"]');
    await sleep(1000);
    this.log('Logged in');
  }

public async createBlankRepo(): Promise<void>{
    await this.#browser.page.goto(`https://github.com/kylewandishin?tab=repositories`);
    const repoExists = await this.#browser.page.$('a[href="/kylewandishin/h1F4i4e8A4"]');
    if (repoExists) {
        this.log('Repo already exists');
    }else{
    this.log('Creating blank repo');
    await this.#browser.page.click('.text-center');
    
    await sleep(1000);

    await this.#browser.page.click('div.hnmzXm > div:nth-child(1) input');
    await this.#browser.page.fill('body > div.logged-in.env-production.page-responsive > div.application-main > main > react-app > div > form input', 'h1F4i4e8A4');
    
    await sleep(1000);
    
    await this.#browser.page.click('div.Box-sc-g0xbh4-0:nth-child(6) button');

    this.log(`Blank repo created - name h1F4i4e8A4`);
    }
}

public async deleteRepo(): Promise<void>{
    this.log('Deleting repo');
    await this.#browser.page.goto(`https://github.com/${this.#GIT_USER}/h1F4i4e8A4/settings`);
    await this.#browser.page.click('#dialog-show-repo-delete-menu-dialog > span > span');
    await this.#browser.page.click('#repo-delete-proceed-button')
    await this.#browser.page.click('#repo-delete-proceed-button')
    await this.#browser.page.fill('.FormControl-input-wrap input', `${this.#GIT_USER}/h1F4i4e8A4`);
    await this.#browser.page.click('#repo-delete-proceed-button');
    this.log('Deleted repo');
}

public async runAll(): Promise<void>{
    await new Promise((resolve) => setTimeout(resolve, 50000));
}

  public async open(): Promise<void>{
    await this.#browser.open();
  }

  public async close(): Promise<void>{
    await this.#browser.close();
  }
}
