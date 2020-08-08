function setGallery(el) {
    var elements = document.body.querySelectorAll(".gallery");
    elements.forEach(element => {
        element.classList.remove('gallery');
	});
	if(el.closest('ul, p')) {
		var link_elements = el.closest('ul, p').querySelectorAll("a[class*='lightbox-']");
		link_elements.forEach(link_element => {
			link_element.classList.remove('current');
		});
		link_elements.forEach(link_element => {
			if(el.getAttribute('href') == link_element.getAttribute('href')) {
				link_element.classList.add('current');
			}
		});
		if(link_elements.length>1) {
			document.getElementById('lightbox').classList.add('gallery');
			link_elements.forEach(link_element => {
				link_element.classList.add('gallery');
			});
		}
		var currentkey;
		var gallery_elements = document.querySelectorAll('a.gallery');
		Object.keys(gallery_elements).forEach(function (k) {
			if(gallery_elements[k].classList.contains('current')) currentkey = k;
		});
		if(currentkey==(gallery_elements.length-1)) var nextkey = 0;
		else var nextkey = parseInt(currentkey)+1;
		if(currentkey==0) var prevkey = parseInt(gallery_elements.length-1);
		else var prevkey = parseInt(currentkey)-1;
		document.getElementById('next').addEventListener("click", function() {
			gallery_elements[nextkey].click();
		});
		document.getElementById('prev').addEventListener("click", function() {
			gallery_elements[prevkey].click();
		});
	}
}

document.addEventListener("DOMContentLoaded", function() {

    //create lightbox div in the footer
    var newdiv = document.createElement("div");
    newdiv.tabIndex = 0;
    newdiv.setAttribute('id',"lightbox");
    document.body.appendChild(newdiv);

    //add classes to links to be able to initiate lightboxes
    var elements = document.querySelectorAll('img');
    elements.forEach(element => {
        var url = element.getAttribute('data-stl');
        if(url) {
            element.classList.add('lightbox-image-stl');
        }
    });

    //remove the clicked lightbox
    document.getElementById('lightbox').addEventListener("click", function(event) {
        if(event.target.id == 'close'){
            this.innerHTML = '';
            document.getElementById('lightbox').style.display = 'none';
        }
    });
    // hit esc to dismiss lightbox
    document.getElementById('lightbox').addEventListener("keydown", function(event) {
        if(event.key == 'Escape'){
            this.innerHTML = '';
            document.getElementById('lightbox').style.display = 'none';
        }
    });

    //add the stl lightbox on click
    var elements = document.querySelectorAll('img.lightbox-image-stl');
    elements.forEach(element => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById('lightbox').innerHTML = '<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div id="model" class="img" style="width: 100%; height:100%;" title="'+this.getAttribute('title')+'" ><</div><span>'+this.getAttribute('title')+'</span>';
            document.getElementById('lightbox').style.display = 'block';
            document.getElementById('model').setAttribute('data-rotate', 'x');
            document.getElementById('model').setAttribute('data-zdistance', '4');
            STLViewer(document.getElementById("model"), this.getAttribute('data-stl'));
            setGallery(this);
            document.getElementById('lightbox').focus();
        });
    });

});
