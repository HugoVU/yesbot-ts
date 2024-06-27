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

#### Hugo
**ensureGuildMemberOrNull**

Found in src/event-distribution/helper.ts.
The commit can be found here: https://github.com/HugoVU/yesbot-ts/commit/683a2733362a3a5aea08ebbf51e98be1736512ba

This function had no unit tests at all, so we got a branch coverage of 0% for this particular function:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/9b665713-3b82-4328-bea0-35f2269b8502)

**resolveEmojis**

https://github.com/HugoVU/yesbot-ts/commit/683a2733362a3a5aea08ebbf51e98be1736512ba (Same link as previous, it is one commit)
This function once again had no unit tests at all, so we got a branch coverage of 0%:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/13057281-1655-4878-8ae7-1eebdcf6cd99)

#### Mark
**addEventHandler & extractEventHandler**

Both the coverage tracking was added in the same patch diff, therefore I will squash these 2 functions into the same section.
Github diff link: https://github.com/HugoVU/yesbot-ts/commit/6718b2fe482a5b110dc77c3db59a7f2ccb77c9f9

After every test it will output the coverage that was reached for both functions.
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/13a36c00-2fb5-4724-ae64-e93665c06bba)

After all tests are ran:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/43379fca-a4e6-4be5-906d-2be383864432)

#### Tomas
**MetaCommand (src\programs\meta.ts)**

This function had 0% coverage as seen in the code snippet above and can be confirmed by built in Vitest v8 output:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/1ab34786-534f-4c34-b856-76051ab28b7a)

The following commit on a forked repository includes the instrumented code to gather coverage measurements by tracking the branches hit while running test (and prints the output to the console) as well as the actual code (meta.spec.ts file) of the unit tests added to cover the function:
https://github.com/Yes-Theory-Fam/yesbot-ts/commit/c33ed45c14ea337336597cb10a75c7cbace3506d

**FeatureRequestPending (src\programs\feature-request-pending.ts)**

This function had 0% coverage as well as seen in the code snippet above and can be confirmed by built in Vitest v8 output:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/6ee55a92-61d0-4cee-beb6-93fe84314b2d)

The following commit on a forked repository includes the instrumented code to gather coverage measurements by tracking the branches hit while running test (and prints the output to the console) as well as the actual code (meta.spec.ts file) of the unit tests added to cover the function:
https://github.com/Yes-Theory-Fam/yesbot-ts/commit/959fdb55a6c4526c87f052397a5e4a33d3fe3afe

#### Sebastian
**Resources**

Since there were no unit tests in the first place, a branch coverage of 0% was measured:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/7fd7a665-7be9-415a-9b1c-dbdd994d5d75)

**custom-message**

Again, since there were no unit tests in the first place, a branch coverage of 0% was measured:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/315d3b00-81c2-40be-a5a6-993d6660bda6)

## Coverage improvement

### Individual tests

#### Hugo 
**ensureGuildMemberOrNull**

I added my test in helper.spec.ts. The code can be found here:
https://github.com/HugoVU/yesbot-ts/commit/024355bbfe8c517b56eb188cc54d8b2778ab9b86

As mentioned earlier, the function had 0% coverage. After adding all 4 branches we have 100% coverage for this specific function:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/17d9ae93-24aa-478b-a9d3-8384e9faf1ec)

Compared to earlier:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/7f4af254-0c19-42ac-bf66-bf4b001bc7c9)

And as a result we now cover 5 out of 8 functions with a branch coverage of 81,81% for the entire file:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/981946b3-848a-4df9-aa8b-d324dea929e4)

Since there was no unit test for this function at all, the coverage has been significantly improved. A branch coverage of 81.81% has been achieved for the entire file, which is a solid improvement over the previous 75%.

**resolveEmojis**

I added my unit tests in a new folder called programs. The code can be found here:
https://github.com/HugoVU/yesbot-ts/commit/9a2d3bff7d690fa627d849ff6e157d6dec114bde

After my unit tests we cover 100% of the branches of the function:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/9640213d-0dc3-4cd1-90f7-4c7819871b5a)

Compared to earlier:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/58314073-e0bd-4f5e-a27a-29b1a519df65)

After my implementations we have 87.5% branch coverage of the entire file and 44.44% of all functions are covered. 
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/4b737d65-4e33-48c9-9e52-0ee714da70fc)

As you can see, resolveEmojis, getLetterEmojis, and letterToEmoji are all covered now by unit tests. Considering we had 0% coverage of the entire file, adding these tests ensured a higher branch coverage.

#### Mark
**addEventHandler**
The tests for this function are placed in events.spec.ts

Github diffs for this function can be found here:
https://github.com/HugoVU/yesbot-ts/commit/6b9fca252a01e06c012ce92e6b33967bdfbc591f
https://github.com/HugoVU/yesbot-ts/commit/e28642319a62362b62d5b2de1a2fc7a3473ba055
https://github.com/HugoVU/yesbot-ts/commit/de27e78321457ba566b8d70c90e576f0e6a549be

The original branch coverage can be seen here:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/8f0349a3-2e91-477d-9180-3c0b576008be)

![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/59956f4e-b0de-4103-9e6e-9b8cb31e4265)




### Overall
As previously mentioned the entire project had an initial branch coverage of 39.22%, and 12.75% of the functions. Lastly, a 22.92% statement coverage:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/668133d0-e241-446f-9fab-9ed2d865fd84)

After merging everything together we get:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/6aec24a9-7eb6-438e-8095-d51c3476968b)

This concludes 588 extra statements covered resulting in a 3.77% improvement in statement coverage,  88 branches extra resulting in a 15.75% boost in branch coverage and lastly 22 extra functions covered resulting in an 8.19% increase in function coverage.
Visualized:
![image](https://github.com/HugoVU/yesbot-ts/assets/121669034/3208787a-072e-4be7-b24f-7bc3e8577ee3)



## Statement of individual contributions
The work was evenly distributed throughout the assignment. Each member worked on their own branch on 2 specific functions. Each member reviewed each others work, and only after approval a merge was accepted.

