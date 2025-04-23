window.addEventListener('message', function (event) {

    if (event.origin === "https://run.aicado.ai" && event.data.action === "aicadoResize" && event.data.frameHeight > 0) {
        var iframes = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframes.length; i++) {
            if (!iframes[i].src) continue; // Skip iframe if src is missing

            try {
                var iframeSrc = new URL(iframes[i].src);
            } catch (e) {
                continue; // Skip iframe if URL is invalid
            }

            var searchParams = iframeSrc.searchParams;
            var sValue = searchParams.get('s');
            var tValue = searchParams.get('t');
            var slValue = iframes[i].src.split('go.aicado.ai/')[1]?.split('?')[0];

            if ((slValue === event.data.slParameter) || (sValue === event.data.sParameter && tValue === event.data.tParameter)) {
                iframes[i].style.height = event.data.frameHeight + 'px';
                break;
            }
        }
    }

    if (event.origin === "https://run.aicado.ai" && event.data.action === 'scrollToOutput') {
        var totalOffset = 0;

        var iframes = document.getElementsByTagName('iframe');

        for (var i = 0; i < iframes.length; i++) {
            if (!iframes[i].src) continue; // Skip iframe if src is missing

            try {
                var iframeSrc = new URL(iframes[i].src);
            } catch (e) {
                continue; // Skip iframe if URL is invalid
            }

            var searchParams = iframeSrc.searchParams;
            var sValue = searchParams.get('s');
            var tValue = searchParams.get('t');
            var slValue = iframes[i].src.split('go.aicado.ai/')[1]?.split('?')[0];

            if ((slValue === event.data.slParameter) || (sValue === event.data.sParameter && tValue === event.data.tParameter)) {
                var iframeRect = iframes[i].getBoundingClientRect();
                totalOffset = iframeRect.top + event.data.top + window.pageYOffset;
                break;
            }
        }

        if (totalOffset > 0) {
            window.scrollTo({
                top: totalOffset,
                behavior: 'smooth'
            });
        }
    }

    if (event.origin === "https://run.aicado.ai" && event.data.action === 'copyToClipboard') {
        navigator.clipboard.writeText(event.data.text);
    }
});
