## LikeHome Hotel Booking - SE 165

- Sandro Sallenbach (PM)
- Vinny Senthil
- Minh Phan
- Dale Seen
- Yu Ning Hee
- Lance Ngo
- Caffrey Zheng
- Alex Jiang
- Tien Nguyen
- Yuta Sugiura

### Project Management

#### Story-Board Rules

Story-Board link: https://github.com/minhphan156/LikeHome/projects

```
#To Do
The 'To Do' list is populated with issues (aka stories) that are not yet assigned to any developer.
Those stories are generally created by the PM. If need be, developer can create stories but need to inform PM.
Developers can assign stories to themselves and start working on them on a local branch.

#In Progress
As soon as the dev has code ready, a remote branch can be created and a new pull request created.
The newly created pull request is automatically added to the 'In Progress' column.
Please make sure to follow naming convention when creating new pull request.

A new developer must be assigned to the pull request to review the code changes.
Please check the logic of the code, and make sure it follows good style.
Test the code changes by running the code locally.
If updates are needed, write a review and wait for author to make changes.
When satisfied, merge code into dev-branch.

#Done
The code is now merged into the dev-branch.
Finished stories will be accumulated in 'Done' column and periodically deleted from board by PM or Tech Lead.
Issue should still be 'To Do' and can also be closed.
```

#### Pull Request Rules

```
When raising a pull request,
- please use following naming convention: "SJSU-1234, Created new Feature" (same naming as issue)
- please create a comment, describing the changes you made
- please make sure to tag the minimum amount of required reviewers.
- please inform the reviewers that you tagged them
```

#### Naming Rules

```
Branches:
Use same naming convention as the corresponding issue, f.e. "SJSU-1097"

Pull Requests/Commit:
Use issue/story number + short description of work, f.e. "SJSU-1097, Updated Login screen"
```

## Install dependencies

$npm client-install
install Redux Devtool

## To run the project

$npm run dev

## How to use Heroku:

$ heroku login
$ git add .
$ git commit -am 'type-any-message-here'
$ git push heroku master
