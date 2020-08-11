

// BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var Income = function(id, description, value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var data={
        allItems:{
            exp:[],
            inc:[]
        },
        totals: {
            exp:0,
            inc:0
        }
    }

    return{
        addItem: function(type,des,val){
            var newItem,ID;

            if(data.allItems[type].length>0){
                ID = data.allItems[type][data.allItems[type].length-1].id+1;
            }else{
                ID=0;
            }

            if(type==='exp'){
                newItem = new Expense(ID,des,val);
            }else if(type==='inc'){
                newItem = new Income(ID,des,val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function(){
            console.log(data);
        }
    };

})();


// UICONTROLLER
var UIController = (function(){

    var DOMstrings={
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    }
    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type){
            var html, newHtml, element;

            // Create HTML string with placeholder text
            if(type==='inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type==='exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"<div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //Replace the placeholder text with some actulal data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

        },
        clearFields: function(){
           var fields,fieldsArr;

           fields = document.querySelectorAll(DOMstrings.inputDescription+', '+DOMstrings.inputValue);

           fieldsArr=Array.prototype.slice.call(fields);

           fieldsArr.forEach(function(curr,index,array){
                curr.value="";
           });

        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListiner = function(){
        var DOM = UICtrl.getDOMstrings();

        //ADD BUTTON PRESS EVENT
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        //ENTER KEY PRESS EVENT
        document.addEventListener('keypress',function(e){
            if(e.keyCode===13 || e.which === 13){
                ctrlAddItem();
            }
        });
    }
    var DOM = UICtrl.getDOMstrings();

    var updateBudget = function(){

          // 1. Calculate the budget


          // 2. Return the budget

          // 3. Display the budget on the UI
    }

    var ctrlAddItem = function(){
        var input,newItem;
        
        // 1. Get the filed input data
            input = UICtrl.getInput();

        if(input.description !=="" && !isNaN(input.value) && input.value>0){
            // 2. Add the item to the budget controller
            newItem = budgetController.addItem(input.type,input.description,input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem,input.type);

            //Clear Fields
            UICtrl.clearFields();

            //Calculate and update Budget
            updateBudget();
        }
      
        
      
    }

    return{
        init: function(){
            console.log('Application Started');
            setupEventListiner();
        }
    };
})(budgetController,UIController);


controller.init();