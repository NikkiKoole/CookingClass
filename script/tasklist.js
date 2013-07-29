
var list ={
    "tasks": [
        {},
        {
            "titel": "Pak twee aardappelen<br>en leg ze op het kleed.",
            "onEnter": [
                {
                    "setDraggable": "potato1,true"
                },
                {
                    "setDestinationRect": "potato1,320,440,150,50"
                },
                {
                    "setDraggable": "potato2,true"
                },
                {
                    "setDestinationRect": "potato2,200,400,100,50"
                }
            ]
        },
        {
            "titel": "Schil de aardappelen.",
            "onEnter": [
                {
                    "setDraggable": "peeler,true"
                },
                {
                    "setClickable": "potato1,peeler,4,peel"
                },
                {
                    "setClickable": "potato2,peeler,4,peel"
                }
            ],
            "onExit": [
                {
                    "tweenBackToOrigin": "peeler"
                }
            ]
        },
        {
            "titel": "Doe de deksel<br>van de pan.",
            "onEnter": [
                {
                    "setDraggable": "lid,true"
                },
                {
                    "setDestinationRect": "lid,420,50,180,80"
                }
            ]
        },
        {
            "titel": "Zet de pan <br>op de goede plek.",
            "onEnter": [
                {
                    "setDraggable": "pan,true"
                },
                {
                    "setDestinationRect": "pan,620,430,80,80"
                }
            ],
            "onExit": [
                {
                    "tweenBackToOrigin": "peeler"
                }
            ]
        },
        {
            "titel": "Vul de pan met water.",
            "onEnter": [
                {
                    "setClickable": "water,null,1,waterOn"
                }
            ]
        },
        {
            "titel": "Wacht tot de pan<br>gevuld is.",
            "onEnter": [
                {
                    "setTimer": "12,panFill,panFilled"
                }
            ],
            "onExit": [
                {
                    "tweenBackToOrigin": "peeler"
                }
            ]
        },
        {
            "titel": "Steek het gasflesje aan",
            "onEnter": [
                {
                    "setVisible": "straal,false"
                },
                {
                    "setDraggable": "lighter,true"
                },
                {
                    "setClickable": "burner,lighter,1,burnerOn"
                }
            ],
            "onExit": [
                {
                    "tweenBackToOrigin": "lighter"
                }
            ]
        },
        {
            "titel": "Zet de pan op het vuur.",
            "onEnter": [
                {
                    "setDraggable": "pan,true"
                },
                {
                    "setDestinationRect": "pan,80,220,80,50"
                },
                {
                    "setVisible": "straal,false"
                }
            ],
            "onExit": [
                {
                    "tweenBackToOrigin": "peeler"
                }
            ]
        },
        {
            "titel": "Doe de aardappels in pan.",
            "onEnter": [
                {
                    "setDraggable": "potato1,true"
                },
                {
                    "setDraggable": "potato2,true"
                },
                {
                    "setZ": "potato1,2"
                },
                {
                    "setZ": "potato2,2"
                },
                {
                    "setClickable": "pan,potato1,1,potatoInPan"
                },
                {
                    "setClickable": "pan,potato2,1,potatoInPan"
                }
            ]
        },
        {
            "titel": "Doe de deksel op de pan.",
            "onEnter": [
                {
                    "setDraggable": "lid,true"
                },
                {
                    "setClickable": "pan,lid,1,lidOn"
                }
            ]
        },
        {
            "titel": "Wacht tot het water kookt.",
            "onEnter": [
                {
                    "setTimer": "10,null,null"
                }
            ]
        },
        {
            "titel": "Even laten koken.",
            "onEnter": [
                {
                    "setTimer": "20,panCook,null"
                }
            ]
        },
        {
            "titel": "Doe de deksel van de pan",
            "onEnter": [
                {
                    "setDraggable": "lid,true"
                },
                {
                    "setDestinationRect": "lid,420,50,180,80"
                },
                {
                    "setFrame": "potato1,cooked"
                },
                {
                    "setFrame": "potato2,cooked"
                }
            ]
        },
        {
            "titel": "Zet het vuur uit",
            "onEnter": [
                {
                    "setClickable": "burner,null,1,burnerOff"
                }
            ]
        },
        {
            "titel": "Haal de aardappels<br>uit de pan",
            "onEnter": [
                {
                    "setDraggable": "potato1,true"
                },
                {
                    "setDestinationRect": "potato1,320,440,150,50"
                },
                {
                    "setDraggable": "potato2,true"
                },
                {
                    "setDestinationRect": "potato2,200,400,100,50"
                }
            ]
        }
    ]
}
