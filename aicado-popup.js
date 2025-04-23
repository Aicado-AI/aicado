(function() {
    function createPopup() {
        var popup = document.createElement('div');
        popup.id = 'customPopup';
        popup.style.display = 'none';
        popup.style.position = 'fixed';
        popup.style.zIndex = '1000';
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.minWidth = '320px';
        popup.style.minHeight = '320px';
        popup.style.maxWidth = '640px';
        popup.style.width = 'calc(100% - 40px)'; // Ekran boyutuna göre genişlik
        popup.style.height = 'calc(100% - 40px)'; // Yükseklik de genişlikle aynı
        popup.style.maxHeight = '640px';
        popup.style.border = '0 solid #f1f1f1';
        popup.style.borderRadius = '6px';
        popup.style.backgroundColor = 'white';
        popup.style.overflow = 'hidden';
        document.body.appendChild(popup);

        // Görsel için bir kap içeriği oluştur
        var imageContainer = document.createElement('div');
        imageContainer.id = 'imageContainer';
        imageContainer.style.position = 'absolute';
        imageContainer.style.top = '0';
        imageContainer.style.left = '0';
        imageContainer.style.width = '100%';
        imageContainer.style.height = '100%';
        popup.appendChild(imageContainer);

        // Kapatma butonu
        var closeButton = document.createElement('button');
        closeButton.innerHTML = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '0';
        closeButton.style.right = '0';
        closeButton.style.border = 'none';
        closeButton.style.background = 'rgba(0, 0, 0, 0.6)';
        closeButton.style.color = 'white';
        closeButton.style.fontSize = '20px';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.padding = '5px 10px';
        closeButton.style.marginTop = '10px';
        closeButton.style.marginRight = '10px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.borderRadius = '50%';
        closeButton.onclick = function() { popup.style.display = 'none'; };
        popup.appendChild(closeButton);
    }

    function showPopupWithImage(imageUrl) {
        var popup = document.getElementById('customPopup');
        var imageContainer = document.getElementById('imageContainer');
        if (!popup || !imageContainer) {
            createPopup();
            popup = document.getElementById('customPopup');
            imageContainer = document.getElementById('imageContainer');
        }
        imageContainer.innerHTML = ''; // Önceki içeriği temizleyin
        var img = new Image();
        img.src = imageUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover'; // Görüntüyü kırp ve doldur
        img.style.position = 'absolute';
        img.style.top = '50%';
        img.style.left = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        imageContainer.appendChild(img);

        popup.style.display = 'block';
    }

    window.addEventListener('message', function(event) {
        // Güvenlik için, event.origin kontrolü burada yapılmalı
        if (event.data.type === 'openPopup' && event.data.imageUrl && event.origin === 'https://run.aicado.ai') {
            showPopupWithImage(event.data.imageUrl);
        }
    }, false);

    window.addEventListener('DOMContentLoaded', (event) => {
        createPopup();
    });
})();
