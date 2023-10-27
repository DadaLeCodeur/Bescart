document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".box-button");
    const content = document.querySelector(".box-content");

    button.addEventListener("click", function () {
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });

    // Fermez le menu déroulant lorsque l'utilisateur clique en dehors de celui-ci
    window.addEventListener("click", function (event) {
        if (event.target !== button && event.target !== content) {
            content.style.display = "none";
        }
    });
});

function resizeIframe() {
    iFrameResize({
        log: false,
        checkOrigin: false,
        heightCalculationMethod: 'grow',
        autoResize: false,
        onMessage: function (messageData) {
            var jsonData = JSON.parse(messageData.message);
            if (jsonData.action == 'navigateTo') {
                window.onbeforeunload = null;
                window.parent.location.href = jsonData.data;
            }
            if (jsonData.action == 'scrollTo') {
                setTimeout(function () {
                    document.getElementById('fitPrintAnchor').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
            }
        },
        onInit: function (iframe) {
            $(document).ready(function () {
                $(window).on('scroll', () => {
                    const scrollFromTop = $(document).scrollTop();
                    var fitPrintIframe = $('#fitPrintIframe');
                    var offset = fitPrintIframe.offset();
                    if (scrollFromTop > offset.top + 10) {
                        iframe.iFrameResizer.sendMessage(scrollFromTop - (offset.top - 10));
                    }
                    if (scrollFromTop == 0) {
                        iframe.iFrameResizer.sendMessage(scrollFromTop);
                    }
                });
            });
        },
    }, '#fitPrintIframe');
}

document.addEventListener("DOMContentLoaded", function () {
    const showMoreButton = document.getElementById("show-more-button");
    const showLessButton = document.getElementById("show-less-button");
    const hiddenContent = document.querySelector(".hidden-content");

    showMoreButton.addEventListener("click", function () {
        hiddenContent.style.display = "block";
        showMoreButton.style.display = "none";
        showLessButton.style.display = "block";
    });

    showLessButton.addEventListener("click", function () {
        hiddenContent.style.display = "none";
        showMoreButton.style.display = "block";
        showLessButton.style.display = "none";
        
    });
});

