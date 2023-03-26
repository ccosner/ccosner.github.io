window.addEventListener('load', () => {
    const rellax = new Rellax('.rellax');
    const wpArr = document.querySelectorAll('.wp');

    const animateCSS = (node, animation, prefix = 'animate__') =>
        new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;

            node.classList.add(`${prefix}animated`, animationName);

            function handleAnimationEnd(event) {
                event.stopPropagation();
                //node.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd, { once: true });
        });

    wpArr.forEach((wp, i) => {
        wp.classList.add('hidden');
        const wpId = 'wp_' + i;
        wp.id = wpId;

        new Waypoint({
            element: wp,
            handler: function (direction) {
                if (direction === 'down') {
                    wp.classList.remove('hidden');
                    if (wp.classList.contains('box')) {
                        animateCSS(wp, 'zoomIn');
                    } else if (wp.classList.contains('bug-light')) {
                        animateCSS(wp, 'flash');
                    } else {
                        wp.childNodes.forEach((el) => {
                            animateCSS(el, 'fadeInUp');
                        });
                    }
                }
            },
            offset: '80%'
        });
    });
});
