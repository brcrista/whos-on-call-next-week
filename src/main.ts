import * as core from '@actions/core';

import * as whosOnCallNextWeek from './whos-on-call-next-week';

async function main(): Promise<void> {
    try {
        await whosOnCallNextWeek.run({
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

main().catch(err => console.error(err));