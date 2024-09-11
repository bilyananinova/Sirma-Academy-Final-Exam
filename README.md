# React + Vite 
## Sirma Academy Final Exam

This React app is an exam in Sirma Academy season 4 and displays information about European Football Championship 2024. \
It contains the following views:
- Home page
- Match details
- Team details
- Player details
 
### Home Page
On the home page, I show all the matches played during Euro 2024. The information for each match contains data about the match, the participants, the name of the manager and the result.
 
### Match Details Page 
The match details contain detailed information about the match, with the numbers, names and positions of the players. For this purpose, I have first filtered the specific match from the general list and filtered team from the list of teams. The information for each match contains the teamId, each player has a property teamId.
 
### Team Details
Team details show the team information like name, group, manager name and team player list with their numbers, names and positions. First filtered the team by Id from the team list and use the team Id to filter the players by teamId.

### Player Details
Player details shows information about all matches in which player has participated. First I filtered the player by Id, then all the records for him from records.cvs by his Id and all the matches in which he participated.
 
Input data is loaded from csv files with no libraries for csv parcing.
