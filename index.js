const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
    try {
        const token = core.getInput('token')
        const title = core.getInput('title')
        const body = core.getInput('body')

        const octokit = new github.getOctokit(token)
        const resp = await octokit.rest.issues.create({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            title,
            body,
            assignees: undefined,
        })

        core.setOutput('issue', JSON.stringify(resp.data))
    } catch (error) {
        core.setFailed(error.message)
    }
}
run()
