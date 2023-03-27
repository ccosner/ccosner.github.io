window.addEventListener('load', () => {
    const rellax = new Rellax('.rellax');
    const wpArr = document.querySelectorAll('.wp');

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
        wp.classList.add('hidden');
        const wpId = 'wp_' + i;
        wp.id = wpId;

        new Waypoint.Inview({
            element: wp,
            enter: function (direction) {
                wp.classList.remove('hidden');
                if (wp.classList.contains('zoomIn')) {
                    animateCSS(wp, 'zoomIn');
                } else if (wp.classList.contains('fadeInLeft')) {
                    animateCSS(wp, 'fadeInLeft');
                } else if (wp.classList.contains('flash')) {
                    animateCSS(wp, 'flash');
                } else if (wp.classList.contains('fadeInUp')) {
                    wp.childNodes.forEach((el) => {
                        animateCSS(el, 'fadeInUp');
                    });
                } else {
                }
            },
            // entered: function (direction) {},
            // exit: function (direction) {},
            exited: function (direction) {
                wp.classList.add('hidden');
            }
        });
    });
});
