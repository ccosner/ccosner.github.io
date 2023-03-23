const wpArr = document.querySelectorAll('.wp');
const bodyClass = document.body.className;

const setBodyClass = (bodyClass) => {
    document.body.className = bodyClass;
};

const animateCSS = (node, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;

        node.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });

wpArr.forEach((wp, i) => {
    const wpId = 's_' + i;
    const prevWpId = 's_' + (i - 1);
    wp.id = wpId;

    new Waypoint({
        element: wp,
        handler: function (direction) {
            if (direction === 'down') {
                setBodyClass(wpId);
            } else {
                setBodyClass(prevWpId);
            }
        },
        offset: '50%'
    });
});
