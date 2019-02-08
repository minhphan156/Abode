## LikeHome Hotel Booking - SE 165
This project is done in San Jose State University course cmpe 165 spring 2019.

(Project name) a web application (or mobile application) whichshares catalog of ideas.  (Project name) is a mini clone of the very successful product hotel.com.

The live version will be on: namedothostdotcom.

##Team
- Project Manager: [Sandro Sallenbach](https://github.com/SandroSal)
- [Vinny Senthil](https://github.com/vinnysenthil)
- [Minh Phan](https://github.com/minhphan156)
- [Dale Seen](https://github.com/DaleCS)
- [Yu Ning Hee](https://github.com/ynoe)
- [Quang "Lance" Ngo](https://github.com/lance-ngo)
- [Hongbin "Caffrey" Zheng](https://github.com/HongbinZheng)
- [Jinshan "Alex" Jiang](https://github.com/itjinshan)
- [Tien Nguyen](https://github.com/tienquocnguyen)
- [Yuta Sugiura](https://github.com/yuta05)

### Project Management

#### Story-Board Rules


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
