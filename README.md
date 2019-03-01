## Abode Hotel Booking - SE 165

Abode is a project by students at San Jose State University as part of their SE 165, Spring 2019 class. It emulates a hotel booking site (like hotels.com) with all its features and functions.

The live version will be available soon on: https://www.abode-hotel.com

## Team
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

Story-Board link: https://github.com/minhphan156/Abode/projects

```
#To Do
The 'To Do' list is populated with issues (aka stories) that are not yet assigned to any developer.
Those stories are generally created by the PM. If need be, developer can create stories but need to inform PM.
Developers can assign stories to themselves and start working on them on a local branch.

#In Progress
When a story gets (self-)assigned, drag and drop the story into 'In Progress'

#Needs Review
As soon as the developer has code ready, a remote branch and a corresponding pull request can be created.
The newly created pull request is automatically added to the 'Needs Review' column.
Please make sure to follow naming convention when creating new pull request.
A new developer must be assigned to the pull request to review the code changes.

For the reviewer:
Please check the logic of the code, and make sure it follows good style.
Test the code changes by running the code locally.
If updates are needed, write a review and wait for author to make changes.
When satisfied, merge code into dev-branch.

#Done
The code is now merged into the dev-branch.
Finished stories will be accumulated in the 'Done' column. They will be periodically archived by PM or Tech Lead.
Issue should still be 'In Progress' and can also be archived.
```

#### Pull Request Rules

```
When raising a pull request,
- please use following naming convention: "SJSU-1234, Created new Feature" (same naming as issue)
- add project "Abode-Story Board"
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

\$npm client-install
install Redux Devtool

## To run the project

\$npm run dev

## How to use Heroku:

$ heroku login
$ git add .
$ git commit -am 'type-any-message-here'
$ git push heroku master
