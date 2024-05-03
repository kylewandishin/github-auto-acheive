import 'dotenv/config';
import { GithubClient } from './github';
import { parseError } from './Error';
(async (): Promise<void> => {
    const args = process.argv.slice(2);

    const githubClient = new GithubClient(args.includes('--debug') || args.includes('-d'));
    await githubClient.init();
    await githubClient.login();
    await githubClient.createBlankRepo();
    //   await githubClient.runAll();
    await githubClient.deleteRepo();
    await githubClient.close();
    
})().catch((err) => {
    parseError(err);
});
