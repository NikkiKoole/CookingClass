The engine
==========

- should handle transitions/tweens as a king
- should have Texts, Rects, Circles, Lines, Sprites and Animations
- can have objects made up from these basic blocks
- should have some kind of sensible API to handle standard behaviours (defined in a gamePlay global), 
- should have ONE way of handling methods that live in the (sub cLassed)gameObject itself.
- should not have duplicate info in objects, get data from Dom instead. keep gameObjects LIGHT.


At it simplest a gameObject is this 
{
    'name':'example',
    'type':'rectangle',
    'div':someDIV
}



