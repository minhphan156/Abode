## SJSU Shop - SE 133

- Project Manager: Sandro Sallenbach
- Product Owner: Vinny Senthil
- Tech Lead: Kento Murray
- SW Developer: Minh Phan
- SW Developer: Sterling Gamble
- SW Testing: Dale Seen
- SW Testing: Yu Ning Hee
- Documentation: Justin Magadia


### Project Management

#### Story-Board Rules

[Story Board](https://github.com/Abcbadq/sjsu_shop/projects/1)
```
#To Do
The 'To Do' list is populated with issues (aka stories) that are not yet assigned to any developer.
Those stories are generally created by the PM. If need be, developer can create stories but need to inform PM.
When stories are picked up (assigned to a dev), they have to be manually moved to 'In Progress'. 

#In Progress
As soon as the dev has code ready, a remote branch can be created and a new pull request created.
The newly created pull request has to be added to 'Needs review', by clicking "Add cards".
Please leave the issue open and in 'In Progress' until entire story is done.
Please make sure the name of pull request and issue match.

#Needs review
A new developer must be assigned to the pull request to review the code changes.
Please check the logic of the code. Also, make sure it follows good style.
If updates are needed, write a review and wait for author to make changes.
When satisfied, merge code into dev-branch.

#Ready for verification
The code is now merged into the dev-branch.
New assignee has to test the develop branch according to specified rules in pull request.
If verified successfully, please move story to 'Done'.

#Done
Finished stories will be reviewed by Tech lead or PM and can be deleted from board.
Issue should still be 'In Progress' and can also be closed.
```

#### Pull request Rules
```
When raising a pull request,
- make sure you have written unit tests for your code.
- please use following naming convention: "SJSU-1234, what I did" (same naming as issue)
- please update Story Board.
- please discribe the changes you made
- please make sure to tag the minimum amount of required reviewers.
- please let the reviewers know about their new task
- please add a comment section for verification with instructions on how to verify*

*during verification, a dev will manually test the features you worked on

```

#### Naming Rules
```
Branches:
Use same naming convention as the corresponding issue, f.e. "SJSU-1097"

Pull Requests/Commit:
Use issue/story number + short description of work, f.e. "SJSU-1097, Updated Login screen"
```
