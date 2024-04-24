# Dish Direct
Dish Direct is a MERN web app designed to streamline the process of finding and saving recipes. Users can search for recipes according to their preferences, and save their favorites for later reference. With seamless synchronization across sessions via Google OAuth, Dish Direct ensures that cooking inspiration is always at one's fingertips.

## Video Demonstration
https://github.com/dtobrien23/dish-direct/assets/117929503/07881f4d-26a4-4412-bd33-9e3ee02e0d82

## How It Works
1. User Search: Users can search for recipes by entering a query into the search box or selecting predefined options on the Home page. The query can include keywords, ingredients, or dietary preferences.
2. Backend Processing: When a user submits a search query, it is sent to the backend server. The server interacts with the Spoonacular API, a recipe and food data API, to fetch recipes that match the user's query, and handles authentication and error handling for API requests.
3. Frontend Display: The list of matching recipes returned by the backend is displayed on the frontend user interface. Each recipe is presented with its title, image, and additional details such as recipe time and dietary information.
4. Recipe Details: Users can click on a specific recipe to view more detailed information about it. This includes a list of ingredients, cooking instructions, and any additional notes or tips. This information is included in the data returned by the backend in the previous step.  
5. User Authentication: Users can sign in to the application using their Google account. This is facilitated by Google OAuth, a secure authentication mechanism provided by Google. When a user logs in, the frontend and backend communicate with the Google OAuth service to authenticate the user's identity.
6. Recipe Saving: Authenticated users have the ability to save recipes for later reference. When a user clicks the 'Save' button on a recipe, the frontend sends a request to the backend server to save the recipe details (such as ID, title, and image URL) to a MongoDB database. This allows users to access their saved recipes across different sessions.
7. Saved Recipe Retrieval: When a user logs in, the backend server retrieves the list of saved recipes associated with the user's account from the MongoDB database. This information is then sent to the frontend, where it is displayed to the user on the Saved Recipes page.
8. Individual Recipe Retrieval: Detailed information for each saved recipe, such as ingredients and cooking instructions, is retrieved from the Spoonacular API using the recipe ID. This information is displayed to the user when they click on a saved recipe.
