function setClickable(item) {

    var args = item.split(',');
    var clickCounter = {
        'name': args[0],
        'against': args[1],
        'times': args[2],
        'callback': args[3]
    };
    taskCounters.addSpecial(clickCounter);
}



function setDraggable(item) {
    var args = item.split(',');
    var t = GameWorld.getObject(args[0]);
    if (t) {
        t['draggable'] = (args[1] === 'true');
    } else {
        print("gameobject not found");
    }

}

function setVisible(item) {
    var args = item.split(',');
    var t = GameWorld.getObject(args[0]);

    if (t) {

        t.setVisible(args[1]);
    }
}

function setZ(item) {
    var args = item.split(',');
    var t = GameWorld.getObject(args[0]);
    if (t) {
        t.setZ(args[1]);
    }

}

function setDestinationRect(item) {
    var args = item.split(',');
    if (args.length === 5) {
        GameWorld.addDestination(args[0], args[1], args[2], args[3], args[4]);
    } else {
        print('wrong amount of arguments at setDestinationRect');
    }

}

function tweenBackToOrigin(item) {
    var t = GameWorld.getObject(item);
    var destinationX = t.originX;
    var destinationY = t.originY;

    var reposition = function () {
        t.x = destinationX;
        t.y = destinationY;
    };
    t.setDraggable(false);
    GameWorld.setDragging(null);
    DomManipulator.tweenObj(t.name, destinationX, destinationY, t.layer, t.rotation, 2, 0.01, reposition);
}

function flashAnim(item) {
    domManipulator.flashObj(item);
}

function setTimer(item) {
    var args = item.split(',');
    var description = {
        'ticks': args[0],
        'onTimerTick': args[1],
        'onTimerFinished': args[2]
    };
    taskCounters.addTimer(description);
}

function panFill() {
    GameWorld.getObject('pan').fill();
}

function panFilled() {

}

function panCook(item) {

    var g = GameWorld.getObject('lid');
    var el = document.getElementById('lid');
    DomManipulator.position(el, g.x, g.y - Math.random() * 3, g.layer, -5 + Math.random() * 10);
}

function setFrame(item) {
    var args = item.split(',');
    var t = GameWorld.getObject(args[0]);
    t.setFrame(args[1]);
}
