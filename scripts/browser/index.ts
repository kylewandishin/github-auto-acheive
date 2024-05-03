import { firefox } from 'playwright';
import type { Browser, BrowserContext, Page } from 'playwright';

export class PlaywrightBrowser {
  #browser: Browser | null;
  #context: BrowserContext | null;
  public page: Page;

  public constructor() {
    this.#browser = null;
    this.#context = null;
    this.page = null as unknown as Page;
  }

  public async open() {
    this.#browser = await firefox.launch({ headless: false });
    this.#context = await this.#browser.newContext();
    this.page = await this.#context.newPage();
  }

  public async close() {
    return this.#browser?.close();
  }

  // Add more methods here for interacting with the browser, such as navigating to a URL, clicking elements, etc.
}
