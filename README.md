## Cafe application
A simple cafe application with various menus and dishes.

### Summary

Main page is provided with filtering existing menus by their type: Breakfast, Lunch, Dinner or Generic (available anytime). ***Only active menus show up.***

You can inspect each menu and see the dishes inside, upon clicking button you will see a popup with the dishes, here you can click its name and see dish page with the picture, price and full description.

In header, there is **Authorize** link which will take you to login page, default credentials are: `username - username, password - password`. Next, you'll see admin page, suggesting to choose desired action. 

You can **edit** menus, **create** new ones, **archive** them and **add** single or many dishes to it, the list of available dishes depends on dishes already added to the menu.

Same with dishes, but you cannot archive or edit them, the only available action is **remove**. 

Also, there's sidebar to the left which provides you with navigation between pages.

Authentication is made for the ***Manager*** or ***Admin*** who can perform CRUD operations on these menus aside from ***Unauthorized*** user who can only view them.

## Setting up the project (ubuntu)
1. `git clone https://github.com/hugescrub/cafe.git`
2. Initialize database using [script](https://github.com/hugescrub/cafe/blob/main/server/databaseInit.sql) from `./cafe/server/` and ensure everything imported successfully
3. `cd ./cafe/server/` -> `mvn spring-boot:run`

    **Note: your $JAVA_HOME variable should be pointing to JDK11**

6. `cd ../client/` -> `npm install` -> `npm start`

    **Node version: v12.22.9**
    
## Screenshots
<details>
  <summary>Main page</summary>
   
  ![alt text](https://github.com/hugescrub/utils/blob/main/mainPage.png?raw=true)
</details>

<details>
  <summary>Menu cards</summary>
   
  ![alt text](https://github.com/hugescrub/utils/blob/main/menuCards.png?raw=true)
</details>

<details>
  <summary>Admin actions</summary>
   
  ![alt text](https://github.com/hugescrub/utils/blob/main/adminWelcome.png?raw=true)
</details>

<details>
  <summary>Edit menus page</summary>
   
  ![alt text](https://github.com/hugescrub/utils/blob/main/adminPanel-1.png?raw=true)
</details>

<details>
  <summary>Create menu form</summary>
   
  ![alt text](https://github.com/hugescrub/utils/blob/main/adminPanel-2.png?raw=true)
</details>

<details>
  <summary>Edit dishes page</summary>
   
  ![alt text](https://github.com/hugescrub/utils/blob/main/adminPanel-3.png?raw=true)
</details>

<details>
  <summary>Create dish form</summary>
   
  ![alt text](https://github.com/hugescrub/utils/blob/main/adminPanel-4.png?raw=true)
</details>

<details>
  <summary>Admin panel lightbox</summary>
   
  ![alt text](https://github.com/hugescrub/utils/blob/main/adminPanel-lightbox.png?raw=true)
</details>



