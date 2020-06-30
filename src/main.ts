import * as core from '@actions/core';

import * as assignOncallPrepIssue from './assign-oncall-prep-issue';

async function main(): Promise<void> {
    try {
        await assignOncallPrepIssue.run({
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

main().catch(err => console.error(err));