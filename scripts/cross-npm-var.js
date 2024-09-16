// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const ChildProcess = require('child_process');

function main() {
    const platform = process.platform;
    let cmd = process.argv.slice(2).join(' ');

    if (platform.includes('win')) {
        cmd = cmd.replace(/\$\{(npm_config_[a-z0-9_]+)\}/g, '%$1%');
    }

    ChildProcess.execSync(cmd, { stdio: 'inherit' });

    process.exit(0);
}

main();
