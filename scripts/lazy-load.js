// lazy-load.js
// Credit to ImageKit.io
// https://imagekit.io/blog/lazy-loading-images-complete-guide/

document.addEventListener("DOMContentLoaded", function() {
    var lazyLoadImages;

    if ("IntersectionObserver" in window) {
        lazyLoadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyLoadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyLoadThrottleTimeout;
        lazyLoadImages = document.querySelectorAll(".lazy");

        function lazyLoad () {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }

            lazyLoadThrottleTimeout = setTimeout(function() {
                var scrollTop =  window.pageYOffset;
                lazyLoadImages.forEach(function(img) {
                    if(img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy')
                    }
                });
                if(lazyLoadImages.length == 0) {
                    document.removeEventListener("scroll", lazyLoad);
                    document.removeEventListener("resize", lazyLoad);
                    document.removeEventListener("orientationChange", lazyLoad);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyLoad);
        document.addEventListener("resize", lazyLoad);
        document.addEventListener("orientationChange", lazyLoad);
    }
})
