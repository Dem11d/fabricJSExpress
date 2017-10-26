FabricObject = function (canvas_id, obj = null) {
    const width = 1000;
    const height = 1000;

    let own = this;
    this.data = obj;


    let images = [];
    let gradient;
    let texts = {};
    let elements = {};
    let stackTexts = [];
    let canvas;
    let fonts;

    let linaear_gradient = {
        "a": "52",
        "t": "linear",
        "color": [[0.9073303937911987, 0.5577841401100159, 0.952155351638794], [0.697922945022583, 0.5685657262802124, 0.7589753270149231]],
        "fraction": [0, 0.5]
    };

    let radial_gradient = {
        gradient: {
            t: "radial",
            color: [
                [
                    0.22056595981121063,
                    0.23860955238342285,
                    0.047768693417310715
                ],
                [
                    0.5584452152252197,
                    0.8967934250831604,
                    0.5914113521575928
                ]
            ],
            fraction: [
                "0",
                "1"
            ]
        },
    };

    if (!obj)
        this.data = example_object;


    this.fromJSON = function (data) {
        gradient = null;
        let json;
        if (typeof data === "string")
            json = JSON.parse(data);
        else
            json = data;
        if(!canvas)
            canvas = new fabric.Canvas(canvas_id, {preserveObjectStacking: true,  });
        console.log("render from JSON");
        canvas.loadFromJSON(json.fabricJson, () => {
            stackTexts = json.layers;
            fillElements();
            renderTextStack();
            setMoveable();

            own.updateCanvas(own.data);
        });

        function fillElements() {
            let length = json.layers.length;
            let objects = canvas.getObjects();
            // console.log(objects);
            for (let i = 0, j = length - 1; i < length; i++, j--) {
                elements[json.layers[i]] = objects[j];
            }
            let keys = Object.keys(elements);
            for (let i = 0; i < length; i++) {
                let element = elements[keys[i]];
                let key = keys[i];
                saveElement(element, key);
            }

            function saveElement(element, key) {
                switch (key) {
                    case "Image1":
                    case "Image2":
                    case "Image3":
                        let index = key.substr(5);
                        images[index] = element;
                        break;
                    case "h1":
                    case "h2":
                    case "h3":
                    case "p":
                        texts[key] = element;
                        break;
                    case "gradient":
                        gradient = element;
                        break;
                }
            }

            // console.log(elements);
        }


        function renderTextStack() {
            let length = json.layers.length;
            let list = document.getElementById("item-list");

            for (let i = 0; i < length; i++) {
                let text = document.createElement("li");
                let describe_text = json.layers[i];
                // stackTexts.push(describe_text);
                text.textContent = describe_text;
                text.setAttribute("item", describe_text);
                list.appendChild(text);
            }
        }
    };
    this.testJSON = function () {
        this.fromJSON(example_json);
    };
    this.toSVG = function () {
        let rawSVG = canvas.toSVG();
        rawSVG = rawSVG.replace(/&[^(quot;)]/g, "&amp;");
        // console.log(rawSVG);
        let parser = new DOMParser();
        let svg = parser.parseFromString(rawSVG, "image/svg+xml");

        //insert ids to text tags
        let textKeys = Object.keys(texts);
        let sortedTexts = [];
        stackTexts.map((value) => {
            if (textKeys.indexOf(value) >= 0) {
                sortedTexts.push(value);
            }
        });
        let domTexts = svg.getElementsByTagName("text");
        let domTextsLength = domTexts.length;
        for (let i = 0; i < domTextsLength; i++) {
            domTexts.item(i).setAttribute("id", sortedTexts[domTextsLength - i - 1]);
        }
        //insert ids to images
        let domImages = svg.getElementsByTagName("image");
        let listImages = stackTexts.filter((item) => {
            // console.log(item);
            if (item.indexOf("Image") >= 0) {
                return true;
            }
            return false;
        });

        let listImagesLength = listImages.length;
        for (let i = 0; i < listImagesLength; i++) {
            domImages.item(i).setAttribute("id", listImages[listImagesLength - 1 - i]);
        }
        //change "r" for radial gradients

        let radialGradients = svg.getElementsByTagName("radialGradient");
        for(let i=0;i<radialGradients.length;i++){
            let gradient = radialGradients.item(i);
            if(gradient.hasAttribute("r"))
                gradient.setAttribute("r",Math.abs(gradient.getAttribute("r")));
        }


        setFonts();

        let finalSVG = new XMLSerializer().serializeToString(svg);
        finalSVG = finalSVG.replace(/SVGID_[0-9]*/g, "SVGID_0");
        return finalSVG;

        function setFonts() {
            let defs = svg.getElementsByTagName("defs")[0];
            let style = svg.createElement("style");
            style.setAttribute("type", "text/css");
            style.setAttribute("id", "fontStyles");
            let output = fonts.map(data => {
                let font;
                if (typeof data === "string")
                    font = JSON.parse(data);
                else
                    font = data;
                return `@font-face {
font-family: '${font.family.replace(" ","_")}';
font-style: ${font.variants};
font-weight: ${font.weight};
src: url(${font.url.woff2}) format('woff2');
}\n`;
            });
            style.textContent = output.join(" ");
            defs.appendChild(style);
        }
    };
    this.toJSON = function () {
        let json = canvas.toJSON();
        let layers = stackTexts;
        return JSON.stringify({
            fabricJson: json,
            layers: layers
        });
    };
    this.setData = function (data) {
        this.data = data;
    };
    this.setFonts = function (inputFonts) {
        fonts = inputFonts;
    };
    this.getObjects = function () {
        return canvas.getObjects();
    };
    this.getElements = function () {
        return elements;
    }

    this.changeLayerPosition = function(key,position){

        let array = canvas.getObjects();
        let length = array.length;
        let object = elements[key];
        let oldIndex = array.indexOf(object);
        if(object) {
            let currentPosition = length - 1 - oldIndex;
            let moveTo = length - 1 - position;
            // console.log(currentPosition);
            object.moveTo(moveTo);
            let item = $(`#${key}`);
            if(position>0) {
                let index = currentPosition>position?-1:0;
                let prevElement = $(`#${stackTexts[position+index]}`);
                item.insertAfter(prevElement);

            }else{
                let nextElement = $(`#${stackTexts[position]}`);
                item.insertBefore(nextElement);
            }
            stackTexts.splice(currentPosition, 1);
            stackTexts.splice(position, 0, key);


            //     stackTexts.splice(oldIndex, 1);
            //     stackTexts.splice(newIndex, 0, key);
        }
    },
        this.render = function () {
            gradient = null;
            if(!canvas)
                canvas = new fabric.Canvas(canvas_id, {preserveObjectStacking: true, });
            // adding image
            drawImages(() => {
                drawGradient(own.data.gradient);
                drawText();
                showStack();
                this.refresh();

                this.changeLayerPosition("h1",0);
                this.changeLayerPosition("h2",1);
                this.changeLayerPosition("h3",2);
                this.changeLayerPosition("p",3);

                // canvas.add(new fabric.IText('hello world', { left: width/2, top: height/2 }));
            });

            function drawText() {
                //draw p
                let source_p = own.data.Dom.p;
                let p = new fabric.IText('it is "p" text', {left: width / 2, top: height / 2});
                p.setColor(hsl2rgb(source_p.color.color));
                p.left = p.left - p.width / 2;
                p.top = p.top - p.top / 2;
                // p.fontFamily = "arial";
                canvas.add(p);
                texts.p = p;
                if (source_p.font) {
                    p.fontFamily = source_p.font.family.replace(" ","_");
                    p.fontWeight = source_p.font.weight;
                    p.fontStyle =   source_p.font.style;
                }
                elements.p = p;

                // draw h1
                let source_h1 = own.data.Dom.h1;
                let h1 = new fabric.IText(own.data.domain.name, {
                    left: width / 2,
                    top: 400,
                    fontSize: 180
                });
                h1.setColor(hsl2rgb(source_h1.color.color));
                h1.left = h1.left - h1.width / 2;
                h1.top = h1.top - h1.top / 2;
                if (source_h1.font) {
                    h1.fontFamily = source_h1.font.family.replace(" ","_");
                    h1.fontWeight = source_h1.font.weight;
                    h1.fontStyle = source_h1.font.style;
                }
                canvas.add(h1);
                texts.h1 = h1;
                elements.h1 = h1;

                // draw h2
                let source_h2 = own.data.Dom.h2;
                let h2 = new fabric.IText('Hi, my name is', {
                    left: width / 2,
                    top: 320,
                    fontSize:60
                });
                h2.setColor(hsl2rgb(source_h2.color.color));

                h2.left = h2.left - h2.width / 2;
                h2.top = h2.top - h2.top / 2;
                if (source_h2.font) {

                    h2.fontFamily = source_h2.font.family.replace(" ","_");
                    h2.fontWeight = source_h2.font.weight;
                    h2.fontStyle = source_h2.font.style;
                }
                canvas.add(h2);
                texts.h2 = h2;
                elements.h2 = h2;

                // draw h3
                let source_h3 = own.data.Dom.h3;
                let h3 = new fabric.IText('it is "h3" text', {
                    left: width / 2,
                    top: height / 2,
                });
                h3.setColor(hsl2rgb(source_h3.color.color));

                h3.left = h3.left - h3.width / 2;
                h3.top = h3.top - h3.top / 2;
                if (source_h3.font) {
                    h3.fontFamily = source_h3.font.family.replace(" ","_");
                    h3.fontWeight = source_h3.font.weight;
                    h3.fontStyle = source_h3.font.style;
                }
                canvas.add(h3);
                texts.h3 = h3;
                elements.h3 = h3;

            }

            //drawing images
            function drawImages(callback) {
                let _images = own.data.Dom.images;

                let imageLength = _images.length;
                loadAllImagesSych(_images);

                function loadAllImagesSych(_images) {
                    imageLength = _images.length - 1;
                    loadImage(imageLength);

                    function loadImage(index) {
                        fabric.Image.fromURL(_images[index].src, function (oImg) {
                            canvas.add(oImg);
                            let old_width = oImg.width;
                            oImg.scaleToWidth(width);
                            // oImg.setHeight((oImg.height / old_width) * width);
                            oImg.noScaleCache= false;
                            images[imageLength - index] = oImg;

                            if (index == 0) {
                                callback();
                            } else {
                                loadImage(index - 1);
                            }
                        });
                    }
                }
            }
        }

    this.refresh = function () {
        canvas.renderAll();
        setTimeout(() => {
            Object.keys(texts).forEach(function (key) {
                let item = texts[key];
                item.scaleX = item.scaleX + 0.00001;
                item.scaleY = item.scaleY + 0.00001;
                // item._charWidthsCache = { };
                item._forceClearCache  = true;
            });
            // fabric.util.clearFabricFontCache("Atomic Age");
            if(own.data.Dom.h1.font) {
                let font = own.data.Dom.h1.font.family.replace(" ","_");
                fabric.util.clearFabricFontCache(font);
            }
            if(own.data.Dom.h2.font) {
                let font = own.data.Dom.h2.font.family.replace(" ","_");
                fabric.util.clearFabricFontCache(font);
            }
            if(own.data.Dom.h3.font) {
                let font = own.data.Dom.h3.font.family.replace(" ","_");
                fabric.util.clearFabricFontCache(font);
            }
            if(own.data.Dom.p.font) {
                let font = own.data.Dom.p.font.family.replace(" ","_");
                fabric.util.clearFabricFontCache(font);
            }
            canvas.renderAll();

        }, 1000)
    };

    this.clear = function () {
        canvas.clear();
        let images = [];
        let gradient = null;
        let texts = {};
        let elements = {};
        let stackTexts = [];
        let fonts= null;


        $("#item-list").empty()

    };


    this.updateCanvas = function (data) {
        if (Object.keys(elements).length != 0) {
            let keys = Object.keys(elements);
            let length = keys.length;
            for (let i = 0; i < length; i++) {
                let element = elements[keys[i]];
                let key = keys[i];
                updateElement(key, element);
            }
            this.refresh();

            function updateElement(key, element) {
                let elemSource;
                let baseSource;
                switch (key) {
                    case "Image1":
                    case "Image2":
                    case "Image3":
                        let id = key.substr(5);
                        let width = elements[key].width;
                        let height = elements[key].height;
                        elements[key].setSrc(data.Dom.images[id - 1].src, () => {
                            elements[key].height = height;
                            elements[key].width = width;
                            own.refresh();
                        });
                        break;
                    case "h1":
                    case "h2":
                    case "h3":
                    case "p":
                        elemSource = data.Dom[key];
                        baseSource = data.Dom.global;
                        if (elemSource.font) {
                            element.setFontFamily(elemSource.font.family.replace(" ","_"));
                            element.setFontWeight(elemSource.font.weight);
                            element.setFontStyle(elemSource.font.style);
                        } else {
                            element.fontFamily = baseSource.font.family.replace(" ","_");
                            element.fontWeight = baseSource.font.weight;
                            element.fontStyle = baseSource.font.style;
                        }
                        if(elemSource.text)
                            element.text = elemSource.text;
                        element.fill = hsl2rgb(elemSource.color.color);


                        if(key === "h1"&&!elemSource.text)
                            element.text = data.domain.name;
                        break;

                    case "gradient":
                        drawGradient(data.gradient);
                        break;
                }
            }
        }
    }

    function showStack() {
        $("#item-list").empty();
        showText();
        showGradient();
        showImages();

        setMoveable();

        function showText() {
            let keys = Object.keys(texts);
            let length = keys.length;
            let list = document.getElementById("item-list");
            for (let i = length - 1; i >= 0; i--) {
                let text = document.createElement("li");
                let describe_text = keys[i];
                stackTexts.push(describe_text);
                text.textContent = describe_text;
                text.setAttribute("item", describe_text);
                text.setAttribute("id", describe_text);
                list.appendChild(text);
            }
        }

        function showImages() {
            let length = images.length;
            let list = document.getElementById("item-list");
            for (let i = --length; i >= 0; i--) {

                let image = document.createElement("li");
                let text = "Image" + (3 - i);
                stackTexts.push(text);
                image.textContent = text;
                image.setAttribute("item", text);
                image.setAttribute("id", text);
                list.appendChild(image);
                elements[text] = images[i];

            }
        }

        function showGradient() {
            let _gradient = document.createElement("li");
            _gradient.textContent = "gradient";
            _gradient.setAttribute("item", "gradient");
            _gradient.setAttribute("id", "gradient");
            elements.gradient = gradient;
            stackTexts.push("gradient");


            document.getElementById("item-list").appendChild(_gradient);
        }
    }

    function setMoveable() {
        var sorted = $("#item-list").sortable({
            update: function (event, ui) {
                let item = ui.item[0];
                let newIndex = $(item).index();
                let key = item.getAttribute("item");
                let object = elements[key];

                let length = Object.keys(elements).length;
                let oldIndex = stackTexts.indexOf(key);
                let moveTo = length - 1 - newIndex;
                object.moveTo(moveTo);
                stackTexts.splice(oldIndex, 1);
                stackTexts.splice(newIndex, 0, key);

            }
        });
        $("#item-list li").dblclick(function (event) {
            let item = event.target.getAttribute("item");
            let object = elements[item];
            canvas.setActiveObject(object);

        });
    }


    this.getAngleParams = function () {
        let finalData = {};
        let self = this;
        for (let i = 0; i <= 360; i++) {
            setTimeout(() => {
                example_object.gradient.a = i;
                self.render();
                setTimeout(() => {

                    let parser = new DOMParser();
                    let svg = parser.parseFromString(canvas.toSVG(), "image/svg+xml");
                    let gradient = svg.getElementsByTagName("linearGradient")[0];
                    // console.log(canvas.toSVG())
                    finalData[i] = {};
                    finalData[i]["x1"] = gradient.getAttribute('x1');
                    finalData[i]["y1"] = gradient.getAttribute('y1');
                    finalData[i]["x2"] = gradient.getAttribute('x2');
                    finalData[i]["y2"] = gradient.getAttribute('y2');
                    gradient = null;
                    svg = null;
                    parser = null;

                }, 200);
            }, i * 300 + 300);
        }
    };

    function hsl2rgb(hsl) {
        if(~hsl.indexOf("hsl")) {
            let str = hsl.substring(4);
            str = str.substring(0, str.length - 2);
            let arr = str.split(",");
            let h = Number.parseInt(arr[0]);
            let s = Number.parseInt(arr[1]);
            let l = Number.parseInt(arr[2]);

            var r, g, b, m, c, x

            if (!isFinite(h)) h = 0
            if (!isFinite(s)) s = 0
            if (!isFinite(l)) l = 0

            h /= 60
            if (h < 0) h = 6 - (-h % 6)
            h %= 6

            s = Math.max(0, Math.min(1, s / 100))
            l = Math.max(0, Math.min(1, l / 100))

            c = (1 - Math.abs((2 * l) - 1)) * s
            x = c * (1 - Math.abs((h % 2) - 1))

            if (h < 1) {
                r = c
                g = x
                b = 0
            } else if (h < 2) {
                r = x
                g = c
                b = 0
            } else if (h < 3) {
                r = 0
                g = c
                b = x
            } else if (h < 4) {
                r = 0
                g = x
                b = c
            } else if (h < 5) {
                r = x
                g = 0
                b = c
            } else {
                r = c
                g = 0
                b = x
            }

            m = l - c / 2
            r = Math.round((r + m) * 255)
            g = Math.round((g + m) * 255)
            b = Math.round((b + m) * 255)

            return `rgb(${r},${g},${b})`;
        }else
            return hsl;
    }

    function drawGradient(gradientData) {
        let grad = gradientData;
        let image = images[images.length - 1];
        let document_canvas = document.getElementById(canvas_id);
        let canvas_height = Number.parseInt(document_canvas.getAttribute("height"));
        let canvas_width = Number.parseInt(document_canvas.getAttribute("width"));
        if (!gradient) {
            gradient = new fabric.Rect({
                top: 0,
                left: 0,
                width: canvas_width,
                height: canvas_height,
                opacity: 0.7
            });
            canvas.add(gradient);
        }
        if (grad.t == "radial") {
            gradient.height = gradient.width;
            gradient.top = -(gradient.height - canvas_height) / 2;
        }
        let final_coords = convertAngle(grad);
        console.log(final_coords);
        if (grad.t == "linear") {

            gradient.setGradient('fill', {
                type: grad.t,
                x1: final_coords.x1,
                y1: final_coords.y1,
                x2: final_coords.x2,
                y2: final_coords.y2,

                colorStops: getColorStops()
            });

        }
        else if (grad.t == "radial")
            gradient.setGradient('fill', {
                type: grad.t,
                x1: canvas_width / 2,
                y1: canvas_width / 2,
                x2: canvas_width / 2,
                y2: canvas_width / 2,
                r1: canvas_width / 2,
                r2: 0,

                colorStops: getColorStops()
            });

        function getColorStops() {
            colors = [];
            steps = [];
            result = {};
            // return {0.25:"black",0.5:"white",0.75:"black",1:"white"}
            grad.color.forEach((color) => {
                colors.push(converToRgb(color));
            });
            grad.fraction.forEach((fraction) => {
                steps.push(fraction);
            });
            // steps.shift();
            // steps.push(1);

            if (steps.length != colors.length) {
                throw "bad json, colors and fraction has different amount of elements";
            }
            steps.forEach((step, index) => {
                result[step] = colors[index];
            });
            return result;
        }

        function convertAngle(gradient) {

            // function angleToPoints(degrees) {
            //     let angle = degrees / 180 * Math.PI;
            //     let segment = Math.floor(angle / Math.PI * 2) + 2;
            //     let diagonal =  (1/2 * segment + 1/4) * Math.PI;
            //     let op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
            //     let x = op * Math.cos(angle);
            //     let y = op * Math.sin(angle);
            //     return {
            //         x1: x < 0 ? 1 : 0,
            //         y1: y < 0 ? 1 : 0,
            //         x2: x >= 0 ? x : x + 1,
            //         y2: y >= 0 ? y : y + 1
            //     };
            // }
            // let result = angleToPoints(gradient.a);
            // return{
            //     x1:result.x1*canvas_width,
            //     x2:result.x2*canvas_width,
            //     y1:result.y1*canvas_height,
            //     y2:result.y2*canvas_height,
            // };
            //convert to degree
            let angle = gradient.a ? gradient.a : 0;
            let rad = angle * Math.PI / 180;
            // let rad = 15 * Math.PI / 180;
            let width = Math.abs(Math.tan(rad)) * canvas_height;
            let coef = 1 + Math.abs(Math.tan(rad)) * 0.2;


            let final_height1;
            let final_width1;

            final_width1 = canvas_width;
            final_height1 = canvas_height / width * canvas_width;

            if (canvas_width > width) {
                return {
                    x1: 0,
                    y1: 0,
                    x2: width * coef,
                    y2: canvas_height * coef,
                    // offset: fabriccanvas_height*coef
                }
            } else {
                return {
                    x1: 0,
                    y1: 0,
                    x2: final_width1,
                    y2: final_height1,
                    offset: 0
                }
            }
        }

        function converToRgb(arr) {
            let result = "rgb(";
            for (let i = 0; i < arr.length; i++) {
                result = result + Math.floor(arr[i] * 256);
                if (i < arr.length - 1)
                    result = result + ",";
            }
            result = result + ")";
            return result;
        }
    }
}
