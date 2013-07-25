
var list = 
{
    "tasks": [
        {
            "titel": "pak drie aardappelen en leg ze op het kleed.",
            "onEnter": [
                {
                    "flashAnim": "potato1"
                },
                {
                    "setDraggable": "potato1"
                },
                {
                    "setDestinationRect": "potato1, 300,400, 150, 50"
                },
                {
                    "flashAnim": "potato2"
                },
                {
                    "setDraggable": "potato2"
                },
                {
                    "setDestinationRect": "potato2, 200,400, 50, 150"
                }
            ],
            "onExit": [
                {
                    "print":"Has this worked?"
                }            
            ]
        },
        {
            "titel": "pak een aardappelschilmes.",
            "onEnter": [
                {
                    "flashAnim": "peeler"
                },
                {
                    "setDraggable": "peeler"
                },
                {
                    "setDestinationRect": "peeler, 500,500, 150, 50"
                }
            ],
            //"onExit": []
        },
        {
            "titel": "schil de aardappelen.",
            "onEnter": [
                {
                    "flashAnim": "peeler"
                },
                {
                    "setDraggable": "peeler"
                },
                {
                    "setSpecialCounter": "potato1, peeler, 5"
                    //"setDestinationRect": "peeler, 200,400, 50, 150"
                },
                {
                    "setSpecialCounter": "potato2, peeler, 5"
                    //"setDestinationRect": "peeler, 200,400, 50, 150"
                }
            ],
            //"onExit": []
        }
    ]
}



