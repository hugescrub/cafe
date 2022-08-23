## Cafe application
A simple cafe application with various menus and dishes.

Main page is provided with filtering existing menus by its type: Breakfast, Lunch, Dinner or Generic (available anytime).

You can inspect each menu and see the dishes inside, upon clicking button you will see a popup with the dishes, here you can click its name and see item page with the picture, price and full description.

On header, there is **Authorize** link which will take you to login page, default credentials are: `username - username, password - password`. Next, you'll see admin page, suggesting to choose desired action. 

You can **edit** menus, **create** new ones, **archive** them and *add* single or many dishes to it, the list of available dishes depends on items already added to the menu.

Same with dishes, but you cannot archive or edit them, the only available action is **remove**. 

Also, there's sidebar to the left which provides you with navigation between pages.

Authentication is made for the ***Manager*** or ***Admin*** who can perform CRUD operations on these menus aside from ***Unauthorized*** user who can only view them.

## Setting up the project (ubuntu)
1. `git clone https://github.com/hugescrub/cafe.git`
2. Initialize database using [script](https://github.com/hugescrub/cafe/blob/main/server/databaseInit.sql) from `./cafe/server/` and ensure everything imported successfully
3. `cd ./cafe/server/` -> `mvn spring-boot:run`

    **Note: your $JAVA_HOME variable should be pointing on JDK11**

6. `cd ../client/` -> `npm install` -> `npm start`

    **Node version: v12.22.9**
    
## 

## Upcoming Readme additions

Launch guide

Screenshots

More detailed summary



