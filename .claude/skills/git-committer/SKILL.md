---
name: git-committer
description: Making git commits with informative messages
---

When making a git commit, always make the main title message concise.

**AVOID** adding information on using claude to make the commit.

**PREFER** concise content but remember that the content should not be too short, i.e. it must contain enough info to understand what changes have been introduced.

Also, see the ["Commit emojis" guide](references/commit_emojis.md) when making the commit.

In each message, there should be a "title" row and then more detailed information on what has been changed and this more detailed information shoulds be a list where each item is a new row starting with -. Keep each list item short and to the point.

Before making the commit, always show the planned commit message to the user and ask if it looks good or if they want to change anything. Make clear that the user can suggest edits to any part of the message. Only proceed with the commit after the user has approved the message, applying any requested changes first.

Always commit all changed files that are not ignored unless specifically told not to include some files.
