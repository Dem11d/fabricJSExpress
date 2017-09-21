function FabricObject(canvas_id) {
    const width = 1000;
    const height = 1000;

    let own = this;

    let images = [];
    let gradient;
    let texts = [];


    let example_object = {
        _id: "59b01e2694c5b02eb893fd24",
        snapshots: {
            Cover: "https://knmiddle-cached-images.s3.amazonaws.com/20a100ba-27cd-4239-b43d-b1486adc4eb8.jpg"
        },
        Dom: {
            p: {
                color: {
                    color: "hsl(302, 100%, 50%)"
                }
            },
            images: [{
                keywords: "kodak5222 kodak leica monochrome blacknwhite bnw snapshot snap streetphotography streetshot street playground night basketball joe",
                search_key: "basketball",
                provider: "flickr",
                src: "https://farm5.staticflickr.com/4400/35967625173_18d5fa23f0_b.jpg",
                author: "Joe Streetsnap",
                price: "0",
                author_id: "91424037@N02",
                image_id: "35967625173",
                title: "",
                search_type: "regular"
            },
                {
                    keywords: "athlete,athletic,background,ball,basket,basketball,body,camera,competition,court,direction,energy,equipment,event,exercise,female,finger,fitness,fun,game,hand,healthy,hold,holding,hoop,lifestyle,male,man,orange,palm,person,play,player,portrait,power,professional,recreation,round,score,single,speed,sport,sportsman,standing,street,team,top,training,white,young",
                    search_key: "basketball",
                    provider: "bigstock",
                    src: "http://static9.bigstockphoto.com/thumbs/9/9/1/large2/199146529.jpg",
                    author: "Evgenyjs1",
                    price: "5",
                    image_id: "199146529",
                    title: "",
                    search_type: "regular"
                },
                {
                    keywords: "arrow,attack,background,ball,basketball,basketball player,basketball texture,blackboard,blackboard background,board,board games,card,chalk,chalkboard,chalk board,chalkboard background,closeup,coach,competition,concept,diagram,drawing,education,field,frame,game,gate,goal,green,green field,idea,illustration,instruction,line,lines background,organization,pitch,plan,play,player,playing cards,scheme,sport,sports background,sports balls,strategy,tactic,tactical,texture,training,wooden,wooden background,zone",
                    search_key: "basketball",
                    provider: "bigstock",
                    src: "http://static3.bigstockphoto.com/thumbs/1/1/8/large2/81111083.jpg",
                    author: "Yastremska",
                    price: "5",
                    image_id: "81111083",
                    title: "Scheme basketball game on blackboard background",
                    search_type: "regular"
                }
            ],
            h1: {
                color: {
                    color: "hsl(181, 100%, 50%)"
                },
                font: {
                    weight: "500",
                    style: "normal",
                    id: "585829173d53a3643708ec61",
                    family: "Exo",
                    category: "sans-serif"
                }
            },
            cl1: {
                color: {
                    color: "hsl(326, 100%, 50%)"
                }
            },
            global: {
                color: {
                    color: "hsl(216, 100%, 50%)"
                },
                font: {
                    weight: "700",
                    style: "normal",
                    id: "585829173d53a3643708ebcf",
                    family: "Cormorant Garamond",
                    category: "serif"
                }
            },
            h2: {
                color: {
                    color: "hsl(278, 100%, 50%)"
                },
                font: {
                    weight: "400",
                    style: "normal",
                    id: "585829173d53a3643708edd8",
                    family: "Life Savers",
                    category: "display"
                }
            },
            h3: {
                color: {
                    color: "hsl(290, 100%, 50%)"
                }
            },
            btn: {
                color: {
                    color: "hsl(314, 100%, 50%)"
                }
            }
        },
        domain: {
            provider_: "Sedo",
            price: "688",
            name: "onbasketball.com"
        },
        product_id: "zxdeeWtMv8oRpnFyq",
        gradient: {
            color: [
                [
                    0.38369137048721313,
                    0.6116745471954346,
                    0.4949660301208496
                ],
                [
                    0.4871100187301636,
                    0.7402473092079163,
                    0.40056905150413513
                ],
                [
                    0.3713681995868683,
                    0.11880893260240555,
                    0.9443817734718323
                ],
                [
                    0.2997022867202759,
                    0.6879955530166626,
                    0.7114823460578918
                ]
            ],
            kind: "0",
            angle: 1.0697739186484327,
            fraction: [
                "0",
                0.25,
                0.5,
                0.75
            ]
        },
        style_id: "zWHagdGCwiXKXYojv",
        seqId: "3",
        colors: {
            harmony: [
                "hsl(302, 100%, 50%)",
                "hsl(278, 100%, 50%)",
                "hsl(290, 100%, 50%)",
                "hsl(302, 100%, 50%)",
                "hsl(314, 100%, 50%)",
                "hsl(326, 100%, 50%)"
            ],
            harmonyType: "analogous"
        },
        sid: "2c29vXodX7TLeud6C",
        timestamp: "1504714278694",
        fontSettings: {},
        taste_id: "3hwdJgBNEGp8cqExT"
    };

    let canvas = new fabric.Canvas(canvas_id);


    this.toSvg = function () {
        return canvas.toSVG();
    }

    this.toJSON = function () {
        let fabricJson = canvas.toJSON();
        let layers =
        return {}
    };

    this.testAdd = function () {
        canvas.add(
            new fabric.Rect({
                width: 100,
                height: 200,
                left: 300,
                top: 100,
                fill: 'green',
                angle: 45
            }));

        canvas.add(new fabric.Circle({
            radius: 100,
            left: 300,
            top: 100,
            fill: 'yellow',
            angle: 45,
            selectable: true
        }));

        canvas.add(new fabric.Text("sample for Vlad and Benjamin", {
            fontFamily: "Georgia",
            top: 200,
            left: 300,
        }));
    }
    this.setData = function (data) {
        this.data = data;
    }

    this.setData(example_object);

    this.render = function () {
        // adding image
        drawImages(() => {
            drawGradient();
            console.log(images);
            console.log(gradient);
            showStack();
            drawText();
            // canvas.add(new fabric.IText('hello world', { left: width/2, top: height/2 }));
        });


        function showStack() {
            showGradient();
            showImages();

            setMoveable();

            function showImages() {
                let length = images.length;
                let list = document.getElementById("item-list");
                for (i = --length; i >= 0; i--) {

                    let image = document.createElement("li");
                    let text = "Image" + (3 - i);
                    elements.text = images[i];
                    image.textContent = text;
                    image.setAttribute("item", text);


                    list.appendChild(image);
                    console.log(image);
                }
            }

            function showGradient() {
                let _gradient = document.createElement("li");
                _gradient.textContent = "Gradient";
                _gradient.setAttribute("item", "gradient");
                elements.gradient = gradient;

                document.getElementById("item-list").appendChild(_gradient);
            }

            function setMoveable() {
                var sorted = $("#item-list").sortable({
                    update: function (event, ui) {
                        // serial = $('#sortable').sortable("serialize", { key: "itemorder" });
                        console.log(ui);
                        // console.log(event);
                    }
                });
            }
        }

        function drawText() {
            //draw p
            source_p = own.data.Dom.p;
            let p = new fabric.IText('it is "p" text', {left: width / 2, top: height / 2, color: source_p.color.color});
            p.left = p.left - p.width / 2;
            p.top = p.top - p.top / 2;
            p.fontFamily = "arial";
            canvas.add(p);
            // draw h1
            source_h1 = own.data.Dom.h1;
            let h1 = new fabric.IText('it is "h1" text', {
                left: width / 2,
                top: height / 2,
                color: source_p.color.color
            });
            h1.left = h1.left - h1.width / 2;
            h1.top = h1.top - h1.top / 2;
            h1.fontFamily = source_h1.font.family;
            h1.fontWeight = source_h1.font.weight;
            canvas.add(h1);
        }

        //drawing images
        function drawImages(callback) {
            let _images = own.data.Dom.images;

            let imageLength = _images.length;
            for (let i = --imageLength; i >= 0; i--) {
                let image = _images[i];
                fabric.Image.fromURL(image.src, function (oImg) {
                    // oImg.selectable = false;
                    canvas.add(oImg);
                    images[imageLength - i] = oImg;
                    if (images.length == _images.length) {
                        callback();
                    }
                });
            }
            // adding image
            let fabricImage;
        }

        //adding gradient
        function drawGradient() {
            // console.log(this.data);
            let grad = own.data.gradient;
            let image = images[images.length - 1];
            let rect = new fabric.Rect({
                top: 0,
                left: 0,
                width: image.width,
                height: image.height,
                opacity: 0.7

            });
            gradient = rect;
            final_coords = convertAngle(grad);
            console.log(final_coords);
            rect.setGradient('fill', {
                x1: 0,
                y1: 0,
                x2: final_coords.width,
                y2: final_coords.height,
                colorStops: (function () {
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
                        console.log(steps);
                        console.log(colors);
                        throw "bad json, colors and fraction has different amount of elements";
                    }
                    steps.forEach((step, index) => {
                        result[step] = colors[index];
                    });
                    console.log(result);
                    return result;
                }())
            });

            function convertAngle(gradient) {
                //convert to degree
                let rad = gradient.angle;
                // let rad = 80 * Math.PI / 180;
                let width = Math.abs(Math.tan(rad)) * image.height;
                let coef = 1 + Math.abs(Math.tan(rad)) * 0.2;
                console.log(coef);


                let final_height1;
                let final_width1;

                final_width1 = image.width;
                final_height1 = image.height / width * image.width;

                if (image.width > width) {
                    console.log("first case");
                    return {
                        width: width * coef,
                        height: image.height * coef,
                        // offset: fabricImage.height*coef
                    }
                } else {
                    console.log("second case");
                    return {
                        width: final_width1,
                        height: final_height1,
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

            canvas.add(rect);
        }
    }
}
