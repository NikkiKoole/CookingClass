var introItems = {
    "items": [
    {
            "name": "grass",
            "src": "grass.png",
            "x": 0,
            "y": 0,
            "rotation": 0,
            "layer": -200,
            "width": 800,
            "height": 600,
            "frames": [
                {
                    "name": "normal",
                    "xOffset": 0,
                    "yOffset": 0
                }
            ],
            "initital": "normal"
        },
        {
            "name": "carpet",
            "src": "carpet.png",
            "x": 50,
            "y": 50,
            "rotation": 0,
            "layer": -150,
            "width": 752,
            "height": 568,
            "frames": [
                {
                    "name": "normal",
                    "xOffset": 0,
                    "yOffset": 0
                }
            ],
            "initital": "normal"
        }]
}




var kitchenItems = {
    "items": [
        {
            "name": "straal",
            "src": "waterstraal.png",
            "x": 600,
            "y": 240,
            "rotation": 0,
            "layer": 3,
            "width": 82,
            "height": 289,
            "visible": "false",
            "frames": [
                {
                    "name": "flow1",
                    "xOffset": 0,
                    "yOffset": 0
                },
                {
                    "name": "flow2",
                    "xOffset": 82,
                    "yOffset": 0
                },
                {
                    "name": "flow3",
                    "xOffset": 164,
                    "yOffset": 0
                },
                {
                    "name": "flow4",
                    "xOffset": 246,
                    "yOffset": 0
                }
            ],
            "initial": "flow1"
        },
        {
            "name": "pan",
            "x": 200,
            "y": 140,
            "rotation": 0,
            "layer": 30,
            "width": 300,
            "height": 225,
            "layers": [
                {
                    "name": "panFront",
                    "src": "panFront.png",
                    "x": 200,
                    "y": 140,
                    "rotation": 0,
                    "layer": 3,
                    "width": 300,
                    "height": 225
                },
                {
                    "name": "panBack",
                    "src": "panBackdrop.png",
                    "x": 200,
                    "y": 140,
                    "rotation": 0,
                    "layer": 1,
                    "width": 300,
                    "height": 225
                },
                {
                    "name": "panWater",
                    "src": "panWater.png",
                    "x": 200,
                    "y": 140,
                    "rotation": 0,
                    "layer": 2,
                    "width": 300,
                    "height": 225
                }
            ]
        },
        {
            "name": "lid",
            "src": "panLid.png",
            "x": 200,
            "y": 140,
            "originX": 300,
            "originY": 140,
            "rotation": 0,
            "layer": 3,
            "width": 300,
            "height": 87,
            "frames": [
                {
                    "name": "normal",
                    "xOffset": 0,
                    "yOffset": 0
                }
            ],
            "initital": "normal"
        },
        {
            "name": "peeler",
            "src": "peeler.png",
            "x": 180,
            "y": 500,
            "originX": 180,
            "originY": 500,
            "rotation": 40,
            "layer": 100,
            "width": 62,
            "height": 105,
            "frames": [
                {
                    "name": "normal",
                    "xOffset": 0,
                    "yOffset": 0
                }
            ],
            "initital": "normal"
        },
        {
            "name": "water",
            "src": "water.png",
            "x": 600,
            "y": 10,
            "rotation": 0,
            "layer": 4,
            "width": 198,
            "height": 240,
            "frames": [
                {
                    "name": "normal",
                    "xOffset": 0,
                    "yOffset": 0
                }
            ],
            "initital": "normal"
        },
        
        {
            "name": "burner",
            "src": "burner.png",
            "x": 40,
            "y": 290,
            "rotation": 0,
            "layer": 2,
            "width": 169,
            "height": 229,
            "frames": [
                {
                    "name": "normal",
                    "xOffset": 0,
                    "yOffset": 0
                }
            ],
            "initital": "normal"
        },
        {
            "name": "fire",
            "src": "fire.png",
            "x": 50,
            "y": 270,
            "rotation": 0,
            "layer": 2,
            "width": 138,
            "height": 119,
            "visible": "false",
            "frames": [
                {
                    "name": "fire1",
                    "xOffset": 0,
                    "yOffset": 0
                },
                {
                    "name": "fire2",
                    "xOffset": 138,
                    "yOffset": 0
                }
            ],
            "initital": "fire1"
        },
        {
            "name": "lighter",
            "src": "lighter.png",
            "x": 500,
            "y": 500,
            "originX": 500,
            "originY": 500,
            "rotation": -60,
            "layer": 100,
            "width": 41,
            "height": 105,
            "frames": [
                {
                    "name": "normal",
                    "xOffset": 0,
                    "yOffset": 0
                }
            ],
            "initital": "normal"
        }
    ]
}
