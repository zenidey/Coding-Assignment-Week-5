class Recipe {
    constructor(name, timeOfDay, ingredients){
        this.name = name;
        this.timeOfDay = timeOfDay;
        this.ingredients = ingredients;
    }

    describe(){
        return `${this.name} is eaten at ${this.timeOfDay} of the day`
    }
}


class Chapter {
    constructor(name) {
        this.name = name;
        this.recipes = [];
        this.ingredients = [];
    }

    addPlayer(recipe) {
        if (recipe instanceof Recipe) {
            this.recipes.push(recipe);
        } else {
            throw new Error (`You can only add an instance of Recipe. Argument is not a recipe: ${recipe}`);
        }
    }

    describe() {
        return `${this.recipes.length} are all from ${this.name}`;
    }
}

class Menu {                       
    constructor() {
        this.chapters = [];
        this.selectedChapter = null;
    }

    start() {
        let selection = this.showMainMenuOptions();    
        
        while (selection != 0) {              
            switch (selection) {
                case "1" :
                    this.addChapter();
                    break;
                case "2" :
                    this.viewChapter();
                    break;
                case "3" :
                    this.deleteChapter();
                    break;
                case "4" :
                    this.displayChapters();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();    
        }

        alert("Goodbye!")
    }

    showMainMenuOptions() {
        return prompt (`
        0) exit 
        1) add a new chapter
        2) view a chapter
        3) delete a chapter
        4) display all chapters
        `);
    }

    showTeamMenuOptions(chapterInfo) {
        return prompt (`
            0) back
            1) create a recipe
            2) delete a recipe 
            - - - - - - - - - - - - - -
            ${chapterInfo}
        `);
    }

    displayChapters() {
        let chapterString = " ";
        for (let i = 0; i < this.chapters.length; i++) {
            chapterString += i + ") " + this.chapters[i].name + "\n"; 
        }
        alert(chapterString);
    }

    addChapter() {
        let name = prompt ("Enter name for new chapter:");
        this.chapters.push(new Chapter(name));   
    }

    viewChapter() {
        let index = prompt("Enter the index of the chapter you wish to view");
        if (index > -1 && index < this.chapters.length) {     
            this.selectedChapter = this.chapters[index];         
            let description = "Chapter: " + this.selectedChapter.name + "\n";

            for (let i = 0; i < this.selectedChapter.recipes.length; i++)  {    
                description += i + ") " + this.selectedChapter.recipes[i].name 
                + " - " + this.selectedChapter.recipes[i].ingredients + " This meal is typically eaten at for " 
                + this.selectedChapter.recipes[i].timeOfDay
                "\n";
            }

            console.log(this.selectedChapter.recipes[0]);

            let selection = this.showTeamMenuOptions(description);
            switch (selection){
                case "1" :
                    this.createRecipe();
                    break;
                case "2" :
                    this.deleteRecipe();   
            }
        } 
    }

    deleteChapter() {
        let index = prompt("Enter the index of the chapter you wish to delete");
        if(index > -1 && index < this.chapters.length){
            this.chapters.splice(index, 1);
        }
    }

    createRecipe() {
        let name = prompt("Enter name for new recipe:");
        let timeOfDay = prompt("Enter the time of day you eat this recipe");
        let ingredients = prompt("Enter ingredients for new recipe");
        this.selectedChapter.recipes.push(new Recipe(name, timeOfDay, ingredients));
    }

    deleteRecipe() {
        let index = prompt("Enter the index of the recipe you wish to delete");
        if (index > -1 && index < this.selectedChapter.recipes.length){
            this.selectedChapter.recipes.splice(index, 1);          
        }
    }
}

let menu = new Menu();    
menu.start();


