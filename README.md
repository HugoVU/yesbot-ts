# A PDF file of this report can be found on the Repo, which is much easier to read.

# Report for Assignment 1

## Project chosen

Name: Yesbot
URL: https://github.com/Yes-Theory-Fam/yesbot-ts

Number of lines of code and the tool used to count it: 13.4k lines, counted with lizard

Programming language: TypeScript

## Coverage measurement

### Existing tool

We used Vitest to measure the coverage of the project, with v8 as provider. The project already included Vitest for unit testing purposes. All we had to do was add the flag coverage in package.json and we get a nice report.   
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/668133d0-e241-446f-9fab-9ed2d865fd84)
The entire project had an initial coverage of 39.22%. A more detailed overview of the analysis can be found on the github, on the assignment1 branch. 

### Your own coverage tool

<The following is supposed to be repeated for each group member>

Hugo
#### ensureGuildMemberOrNull

Found in src/event-distribution/helper.ts
The commit can be found here: https://github.com/HugoVU/yesbot-ts/commit/683a2733362a3a5aea08ebbf51e98be1736512ba
This function had no unit tests at all, so we got a branch coverage of 0% for this particular function:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/9b665713-3b82-4328-bea0-35f2269b8502)

4 out of 8 functions in the entire helper.ts file were covered, and 75% of the branches:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/b06ef38d-9720-4948-b4c7-d6c4e9c22bb6)


#### resolveEmojis

https://github.com/HugoVU/yesbot-ts/commit/683a2733362a3a5aea08ebbf51e98be1736512ba (Same link as previous, it is one commit)
This function once again had no unit tests at all, so we got a branch coverage of 0%:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/13057281-1655-4878-8ae7-1eebdcf6cd99)


## Coverage improvement

### Individual tests

<The following is supposed to be repeated for each group member>

<Group member name>

<Test 1>

<Show a patch (diff) or a link to a commit made in your forked repository that shows the new/enhanced test>

<Provide a screenshot of the old coverage results (the same as you already showed above)>

<Provide a screenshot of the new coverage results>

<State the coverage improvement with a number and elaborate on why the coverage is improved>

<Test 2>

<Provide the same kind of information provided for Test 1>

### Overall

<Provide a screenshot of the old coverage results by running an existing tool (the same as you already showed above)>

<Provide a screenshot of the new coverage results by running the existing tool using all test modifications made by the group>

## Statement of individual contributions

<Write what each group member did>
