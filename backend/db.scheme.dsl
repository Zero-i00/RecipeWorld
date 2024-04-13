

Table User {
    id integer [primary key]
    username varchar
    password varchar
    avatar file
    first_name varchar
    last_name varchar
}

Table Recipe {
    id integer [primary key]
    images file[]
    title varchar
    description text
    prep_time float
    cook_time float
    serving integer
    proteins float
    fats float
    carbs float
    type RecipeTypeEnum
    created_at datetime
}

enum RecipeTypeEnum {
    first
    second
    salad
    dessert
    starter
    drink
}

Table Cuisine {
    id integer [primary key]
    name varchar
}

Table Ingredient {
    id integer [primary key]
    title varchar
    amount float
    unit IngredientUnitEnum
}

enum IngredientUnitEnum {
    milligrams
    grams
    kilograms
    milliliters
    liters
    pieces
}

Table RecipeNote {
    id integer [primary key]
    text text
}

Table RecipeInstructionStep {
    id integer [primary key]
    step integer [unique]
    text text
}

Table Comment {
    id integer [primary key]
    title varchar
    text text
    created_at datetime
}


Ref: User.id < Recipe.id
Ref: Recipe.id < Comment.id
Ref: Recipe.id < RecipeInstructionStep.id
Ref: Recipe.id < Ingredient.id
Ref: Recipe.id < Cuisine.id
Ref: Recipe.id < RecipeNote.id
Ref: User.id < Comment.id