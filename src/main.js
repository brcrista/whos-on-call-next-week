const core = require('@actions/core');

const whosOnCallNextWeek = require('./whos-on-call-next-week');

async function main() {
    try {
        await whosOnCallNextWeek.run({
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports.main = main;

main().catch(console.error);