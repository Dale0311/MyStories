perform crud in comments
init ui for crud @comments
create a way to distinguish if the current user can perform delete and edit in a comment
<br><b>Scenario:</b>
if currentUser owned the post -> perform delete comment
if currentUser owned the comment -> perform delete or edit
if currentUser owned post and comment -> perform both
<br>
status: <b>DONE</b>
<br>

create delete and edit fn

@delete
create slice for querying delete
create onClickHandlerForDelete
pass the currentUserId
create endpoint @api

<br>
status: <b>DONE</b>
<br>

init editComment
Bugs:

- didn't update the time ago : <b>DONE</b>
- didin't close all the poppers : <b>DONE</b>

- after editComment -> perform crud for posts <b>DONE</b>

- REFACTOR B4 implementing user and authentication

1. create a dedicated slice for comment so it will lessen the code of postSlice <b>DONE</b>
2. naming params and args should be consistent in slice <b>DONE</b>
3. TBA

##### future refactors

1. sign up

- error state. there's a lot of repetition of logic

### Upnext:

- create authSlice na ako <b>DONE: 3/12/2024</b>
- refactor routes <b>DONE: 3/14/2024</b>
- refactor post excerpt <b>DONE: 3/17/2024</b>
- refactor bug current user <b>DONE: 3/18/2024</b>
- HAPPY FIESTA BRGY. DOLORES <b>DONE: 3/22/2024</b>

- fix all navigation btns <b>DONE: 3/20/2024</b>
- fix number of posts shown in profile. make it the number of actual posts of the user <b>DONE: 3/20/2024</b>
- make profile route dynamic <b>DONE: 3/20/2024</b>
  1. create endpoint for getUser (get all posts base on the user )
  2. refactor the profile component
- make user able to like comment and reply to comment
