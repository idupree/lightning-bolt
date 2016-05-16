
This is a simple web page that lets you cartoon-simulate
a lightning bolt striking.

Try it:
https://www.idupree.com/lightning-bolt
(sound, visual flashing)

## Some notes on design decisions

### Lightning

A computer screen cannot emit anything as bright as a
lightning bolt.  To create an illusion of more-intense
color changes:
- invert the main colors (blue=pink, green=purple)
- have sidebars that light up from black to grey
- make the lightning bolt's `#fff` color be brighter
    than anything else on the screen

For more details about the timing of flashes
and audio, see comments in `lightning-bolt.js`.

### User expectations/warnings

This page warns the user in many different ways that
clicking will produce sounds and flickering, because
sounds are often rude, and flickering is dangerous for
some people (photosensitive epilepsy).

The click target has an audio symbol on it;
the symbol's alt text is [sound].  The click target
moves and changes cursor when you mouse over it;
its title-text also warns.  Its caption mentions
the sound and the flashing.

As an `<a>` element, you can
tab to it to activate it by keyboard, and its
:focus styles are the same as its :hover styles.
Its link-target, shown by some interfaces, accurately
says "javascript".

### Mobile

The CSS is tested to look good on small portrait
and landscape screens.  Tapping to click is tested.

The meta viewport line has user-scalable=no, because
otherwise, tapping several times in a row
(to make more lightning) gets misinterpreted as a zoom.

Sadly, turning off zooming is frustrating for low-vision
users who want to see the text. (This is mitigated somewhat
by the text being non-critical.  But it's hard to tell
whether the text is important if you can't read it,
and the text does serve some functions.)

### Social media preview

Tested in facebook; custom image set by the `link rel="image_src"`.

### Note

The `AUTOHEAD` and the `?rr` on resource links are for my website's
infrastructure; they have no effect otherwise.

