CookingClass
============

-------------------------------------
**Update** : I've started a new version, the beginnings of that are in the Engine5 folder (jasmine tests are in /spec)
-------------------------------------



----------------------------------------

**HOW TO RUN**
 *download the repository as a zip, unpack it and run index.html in Chrome*
 
------------------------------------------ 
 


A very simple task based game, with engine.
the different parts of the game engine are
 
- **GameObject**
 - comes in two kinds:  the normal one and the layered one 
 - handles world position, rotation and other visible properties, it can also handle multiple frames for animations. The layered version handles a collection of children that move as one and can be retrieved individually.
- **GameWorld**
 - the gameworld has a collection of GameObjects and handles Clicks and MouseMove events, it also polls the TaskList to check if it wants a new task.
 - when the player clicks the gameworld the collider module returns a list of gameObjects you were over.
- **TaskList**
 - the taskList is a group of taskCounters that describe which tasks are open, you can define the taskList (and as such, a level, or a long game) in the taskList.js file, it has a little API (scriptAPI.js)
- **TaskCounter** can handle these kinds of 'events'
   1. destinationRect : A visible rectangle on the screen to click with something.
   2. clickCounter : describe an object to be clicked, while possibly dragging another and for a certain amount. It also has callbacks
   3. timerCounter : a certain amount of ticks it calls onTick and on the end it calls onFinished methods
- **DomManipulator**
 - handles styling and other dom properties for divs, it also generates the correct dom elements from json.
- **collider**
 - checks which elements are colliding with a point, it also returns a group of colliding objects if needed.


basically the game loop functions as follows

1. when GameWorld.handleClick is triggered
    - find elements under cursor
    - drop dragging item when over destination
    - pick up item when possible
    - check if you have any clicks in clickCounter for the elements you found
2. when GameWorld.handleMouseMove is triggered
    - handle repositioning of *dragging* item
1. everytime Gameworld.run() is called
    - check if you have timers and handle them.
    - check if your subTask is done and ask for a new one if so,
    - check if game is done (no more tasks)

the syntax to describe tasks looks like 

>var list ={
    "tasks": [
        {},
        {
            "titel": "Pak twee aardappelen<br>en leg ze op het kleed.",
            "onEnter": [
                {
                    "setDraggable": "potato1,true"
                },
                {
                    "setDestinationRect": "potato1,360,440,50,150"
                },
                {
                    "setDraggable": "potato2,true"
                },
                {
                    "setDestinationRect": "potato2,240,400,50,100"
                }
            ]
        }]


 *  **The functions used in the task script are**
    - setDraggable
    - setDestinationRect
    - setClickable
    - tweenBackToOrigin
    - setTimer 
    - setVisible 
    - setZ 
    - setFrame

a Task can have on onEnter and an onExit piece that gets called at the right times.


