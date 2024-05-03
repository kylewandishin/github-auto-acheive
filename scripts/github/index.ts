import { PlaywrightBrowser } from '../browser';
import { parseError } from '../Error';
import { sleep } from '../util';

export class GithubClient {
  #GIT_USER: string;
  #GIT_PASS: string;

  #debug: boolean;
  #numPRs = 1024;
  #browser: PlaywrightBrowser;

  public constructor(debug = false) {
    this.#GIT_USER = process.env.GIT_USER || '';
    this.#GIT_PASS = process.env.GIT_PASS || '';

    this.validateCredentials();

    this.#debug = debug;
    this.#browser = new PlaywrightBrowser();
  }

  private validateCredentials(): void {
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

  private log(content: string): void {
    if (this.#debug) {
      console.log(`[Debug] - ${content}`);
    }
  }

  public async init(): Promise<void> {
    await this.#browser.open();
  }

  public async login(): Promise<void> {
    this.log('Logging in');
    await this.#browser.page.goto(`https://github.com/${this.#GIT_USER}`);
    await this.#browser.page.click('.HeaderMenu-link--sign-in');
    await this.#browser.page.fill('#login_field', this.#GIT_USER);
    await this.#browser.page.fill('#password', this.#GIT_PASS);
    await this.#browser.page.click('input[type="submit"]');
    await sleep(1000);
    this.log('Logged in');
  }

  public async createBlankRepo(): Promise<void> {
    await this.#browser.page.goto(`https://github.com/kylewandishin?tab=repositories`);
    const repoExists = await this.#browser.page.$('a[href="/kylewandishin/h1F4i4e8A4"]');
    if (repoExists) {
      this.log('Repo already exists');
    } else {
      this.log('Creating blank repo');
      await this.#browser.page.click('.text-center');

      await sleep(1000);

      await this.#browser.page.click('div.hnmzXm > div:nth-child(1) input');
      await this.#browser.page.fill(
        'body > div.logged-in.env-production.page-responsive > div.application-main > main > react-app > div > form input',
        'h1F4i4e8A4'
      );

      await sleep(2000);

      await this.#browser.page.click('div.Box-sc-g0xbh4-0:nth-child(6) button');

      this.log(`Blank repo created - name h1F4i4e8A4`);
    }
  }

  public async deleteRepo(): Promise<void> {
    this.log('Deleting repo');
    await sleep(1000);
    await this.#browser.page.goto(`https://github.com/${this.#GIT_USER}/h1F4i4e8A4/settings`);
    await this.#browser.page.click('#dialog-show-repo-delete-menu-dialog > span > span');
    await this.#browser.page.click('#repo-delete-proceed-button');
    await this.#browser.page.click('#repo-delete-proceed-button');
    await this.#browser.page.fill('.FormControl-input-wrap input', `${this.#GIT_USER}/h1F4i4e8A4`);
    await this.#browser.page.click('#repo-delete-proceed-button');
    this.log('Deleted repo');
  }

  public async runAllPRs(): Promise<void> {
    this.log('Running all PRs');
    for (let i = 0; i < this.#numPRs; i++) {
      this.log(`Creating PR ${i + 1}`);
      await sleep(1000);
      await this.#browser.page.goto(`https://github.com/${this.#GIT_USER}/h1F4i4e8A4`);
      await this.#browser.page.click('.iGmlUb > div > button');
      const element = await this.#browser.page.waitForSelector('.cm-content');
      await this.#browser.page.fill('.cm-content', `${await element?.innerText()}hai:3`);
      await this.#browser.page.click('.cnECWi > button');
      await this.#browser.page.click('div.hnmzXm:nth-child(2) > div:nth-child(1) > input');
      await this.#browser.page.click('.gPkVNE > button:nth-child(2)');
      await this.#browser.page.click('div.BtnGroup > button');
      await sleep(4000);
      await this.#browser.page.click(
        '.merge-message > div:nth-child(1) > div:nth-child(1) > button'
      );
      await this.#browser.page.click('div.BtnGroup:nth-child(2) > button');
      await sleep(4000);
      await this.#browser.page.click('.post-merge-message > button');
    }
    this.log('All PRs complete');
  }

  public async quickDraw(): Promise<void> {
    this.log('Quick drawing');
    await sleep(1000);
    await this.#browser.page.goto(`https://github.com/kylewandishin/h1F4i4e8A4/issues/new`);
    await this.#browser.page.fill(
      '#new_issue > div > div > div.Layout-main > div > div:nth-child(2) > div > div.mb-3 > text-expander > input',
      'hai:3'
    );
    await sleep(1000);
    await this.#browser.page.click('div.flex-items-center:nth-child(7) > button');
    await sleep(1000);
    await this.#browser.page.click(
      '#partial-new-comment-form-actions > div.d-flex.flex-justify-end > div:nth-child(1) > close-reason-selector > div > button'
    );
    this.log('Quick draw complete');
  }

  public async galaxyBrain(): Promise<void> {
    this.log('Galaxy braining - [Not Ready]');
    await sleep(1);
    // for (let i = 0; i < 2; i++) {
    // await sleep(1000);
    // await this.#browser.page.goto(`https://github.com/${this.#GIT_USER}/h1F4i4e8A4/discussions/new?category=q-a`)
    // await this.#browser.page.fill('#js-discussion-title', 'hai:3');
    // await this.#browser.page.fill('#discussion_body', 'hai:3');
    // await this.#browser.page.click('#new_discussion > div > div.Layout-main > div > div:nth-child(3) > div.js-slash-command-surface > div.flex-items-center.flex-justify-end.d-md-flex.my-3 > button');
    // await sleep(1000);

    // await this.#browser.page.fill("#new_comment_field", "hai:3");
    // await this.#browser.page.click('.js-comment-and-button');
    // await sleep(1000);
    // await this.#browser.page.click('button.social-reaction-summary-item:nth-child(2)');
    // }
    this.log('Galaxy brain complete - [Not Ready]');
  }

  public async open(): Promise<void> {
    this.log('Opening browser');
    await this.#browser.open();
    this.log('Browser opened');
  }

  public async close(): Promise<void> {
    this.log('Closing browser');
    await this.#browser.close();
    this.log('Browser closed');
  }
}
