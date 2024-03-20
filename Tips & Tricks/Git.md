## Testing out merges
### Scout Pattern
- Switch to the branch you want to merges changes into (ex: `master`)
- Create new branch from it, switch to it (`test_merge`)
- Merge the changes into that branch (`git merge feat/whatevs`)
	- to abort the merge (if shit has gone wrong): `git reset --hard`
- Check the results
		- if good, go back to original branch (`master`) and merge the test merge branch (`test_merge`)
		- if not, switch to original branch and drop the test merge branch: (`git branch -D test_merge`)
### Savepoint pattern
- Switch to the branch you want to merge changes into (`master`)
- Create a branch from there as a savepoint but don't switch to it (`git branch master-save`)
- merge changes into your branch `git merge feat/whatevs`
	-  to abort the merge (if shit has gone wrong): `git reset --hard`
- Check the results
		- if good, you can delete the save. (`git branch -D master-save`)
		- if not, reset your branch to the save branch you made (`git reset --hard master-save`)
- Note: this works because branches are references (pointers) to commits (nodes). 
	- if you have a reference to another commit, you can you always get back to it.
	- So by making a new branch of off another, we are essentially creating a new pointer referencing the same commit. If something goes wrong, we can always reset to that reference.

### blackbelt merging
- A branch name is a REFERENCE to a commit. It may as well be a commit.
- So instead of using branches of save points, you can just use a commit SHA-1 to reset back to. ``git reset --hard 1234abcd``
## merging changes of a commit to your branch
- `git cherry-pick <commit-sha>`
- it takes the changes of one commit and applies them to your current branch as a new commit
## resetting branch to previous commit or branch
- `git reset --hard <branch-or-sha>`
