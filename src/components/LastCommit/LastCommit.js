import React, { useState, useEffect } from 'react'
import { Octokit } from "@octokit/core";
import { Author, AuthorDate, CommitData, CommitMessage } from './styles';


const LastCommit = ({ github }) => {

  const [commit, setCommits] = useState({});
  const octokit = new Octokit();

  useEffect(() => {
    async function getRequest () {
      try {
        const owner = 'vikelabs',
        repo = github,
        perPage = 1;
        const latestCommit = await octokit.request(
          `GET /repos/{owner}/{repo}/commits`, { owner, repo, per_page: perPage }
        )
        let msg = latestCommit.data[0].commit.message
        let dateOrig = new Date(latestCommit.data[0].commit.committer.date)
        let date = dateOrig.toLocaleDateString('en-us', {day:'numeric', month:'short', year:'numeric'})
        let author = latestCommit.data[0].commit.author.name
        setCommits({msg, date, author})
      }
      catch (error) {
        // Getting in here means someone goofed and didn't
        // put a link into "github" in the project markdowns
        // Do nothing
      }
    }
    getRequest()
  }, [])
  return (
    <>
      { typeof commit.msg !== 'undefined' &&
        <CommitData>
          <AuthorDate>Latest commit by <Author>{commit.author}</Author> on {commit.date}</AuthorDate>
          <CommitMessage>--- {commit.msg}</CommitMessage>
        </CommitData>
      }
    </>
  );
}

export default LastCommit