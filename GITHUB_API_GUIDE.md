# GitHub API Interaction Guide

## Preliminary Setup
- Ensure you have the necessary GitHub tools available
- Available functions include:
  * brave_web_search
  * create_repository
  * create_or_update_file
  * push_files
  * create_branch
  * create_issue
  * search_repositories
  * and more...

## 1. Repository Creation
### Function: `create_repository`
#### Required Parameters:
- `name`: Repository name (string, required)
- `private`: Set repository visibility (boolean, optional)
- `autoInit`: Initialize with README (boolean, optional)

#### Example:
```
create_repository(
  name: "my-project",
  private: true,
  autoInit: true
)
```

## 2. File Creation
### Preferred Method: `push_files`
#### Key Considerations:
- Use an array of file objects
- Each file object needs:
  * `path`: File path (string)
  * `content`: File content (string)

#### Example:
```
push_files(
  repo: "my-project",
  owner: "username",
  branch: "main",
  files: [
    {
      path: "README.md",
      content: "# My Project\n\nProject description goes here."
    }
  ],
  message: "Initial commit"
)
```

### Alternative: `create_or_update_file`
- Can be tricky with encoding
- Requires careful parameter management

## 3. Branch Creation
### Function: `create_branch`
#### Required Parameters:
- `repo`: Repository name
- `owner`: Repository owner
- `branch`: New branch name

#### Example:
```
create_branch(
  repo: "my-project",
  owner: "username",
  branch: "feature-new-design"
)
```

## 4. Issue Creation
### Function: `create_issue`
#### Key Parameters:
- `repo`: Repository name
- `owner`: Repository owner
- `title`: Issue title
- `body`: Issue description
- `assignees`: Optional list of assignees

#### Example:
```
create_issue(
  repo: "my-project",
  owner: "username",
  title: "New Feature Request",
  body: "Detailed description of the feature",
  assignees: ["username"]
)
```

## 5. Common Troubleshooting
- Always double-check parameter names and types
- Use `push_files` as a reliable alternative for file creation
- For encoding issues, consider base64 encoding
- Verify repository and owner names exactly

## 6. Web Search for Context
### Function: `brave_web_search`
- Useful for gathering background information
- Limited to web searches, not GitHub-specific

#### Example:
```
brave_web_search(
  query: "GitHub API best practices",
  count: 5
)
```

## Pro Tips
- Always use the exact repository and owner names
- Be mindful of privacy settings
- Commit messages should be clear and descriptive
- Handle errors gracefully

## Potential Gotchas
- Some functions may have unexpected parameter requirements
- Always be prepared to modify your approach
- Check function results carefully
- Some operations may require multiple steps

## Recommended Workflow
1. Create repository
2. Initialize with basic files
3. Create branches as needed
4. Add issues for tracking
5. Push code and manage repository

---

*Note: This guide is a living document. Always verify with the most current API documentation.*