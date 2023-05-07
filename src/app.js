import axios from "axios";

// Verwijzing maken naar HTML elementen
const inputField = document.getElementById( 'input-field' );
const submitForm = document.getElementById( 'submit-form' );
const recipeList = document.getElementById( 'recipe-list' );

// Variabele voor input value
 let inputValue = '';

// Input event listener
 inputField.addEventListener('input', (event)=>{
     inputValue = event.target.value;
     console.log(inputValue);
})

// Edamam API variabelen
const APP_ID = ''; // Todo: <--- Hier jouw API ID
const APP_KEY = ''; // Todo: <-- Hier jouw API KEY
const URI = `https://api.edamam.com/api/recipes/v2`;

// API URL
async function getRecipes() {
    try {
        const response = await axios.get(`${ URI }?type=public&q=${ inputField.value }&app_id=${ APP_ID }&app_key=${ APP_KEY }` );
        const recipes = response.data.hits;
        console.log( recipes );
        recipes.map((item)=>{
            const { label, url } = item.recipe;
            recipeList.innerHTML += `<li><a class="link" href="${ url }" >${ label }</a></li>`
        })
    } catch ( e ) {
        console.error( e )
    }
}

// Button event listener
submitForm.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    recipeList.innerHTML = null;
    void getRecipes(inputField.value)
    inputField.value = '';
} );
