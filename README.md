
# Github issues kanban board

This is kanban board that displays issues from a link of GitHub repository.

User should enter repo URL in the input on top of the page and press "Load issues".
For example: https://github.com/facebook/react.
## Features

1. App loads issues for the repo using Github API.
2. App contains 3 columns:
    - ToDo (all new issues)
    - In Progress (opened issues with assignee)
    - Done (closed issues)
3. The user can drag columns and change the order of issues.
4. Current issue position (column and order) persisted between search and browser sessions. When the user uploads tasks for Repo1 -> Repo2 -> Repo1, he should see all the changes he made to Repo1.
5. The user is able to visit the profile of the owner of the repo and visit the repo as well by links under the input.
6. The user can close or delete the saved repository that is currently open.


## Kanban board page on Netlify

https://issues-board.netlify.app/


## Tech Stack 
- React
- Typescript 
- SASS
- Ant Design 
- Redux Toolkit
- React Beautiful DnD
## Structure

The Frontend is written in React. For styling used Emotion. Every component has
.component in filename, hook - .hook, service - .service, styles file - .style,
types file - .type, util - .util ​ A brief overview of the contents of the src
folder:
- assets: Icons and images are used in the frontend
- shared: Common components, Base services, hooks, forms error handlers and
  validators, styles consts, types,services and util functions.
- modules: Main content of the frontend ​ Each logical segment of the frontend
  is a module (header, hero, etc.). Modules have a structure: ​

  - components
    - component
      - component.component.tsx
      - component.style.module.scss
## Installation

1. Clone the project

```bash
  git clone https://github.com/theIvanChornyi/issues.git
```

2. Go to the project directory

```bash
  cd issues
```

3. Install dependencies

```bash
  npm install
```

4. Start the server

```bash
  npm start
```


## Tests

Run after instalation

```bash
  npm run test
```
## Reference 
1. **Design and Specs** https://github.com/incodellc/github-kanban-test-task
3. **Docs** https://readme.so/