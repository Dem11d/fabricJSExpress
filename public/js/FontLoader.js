FontLoader = function () {
    this.loadFontsToHeader = function (fonts,cb) {
        let style;
        style = document.getElementById("fontStyles");
        if (!style)
            style = document.createElement("style");
        else
            style.textContent = "";
        style.setAttribute("type", "text/css");
        let output = fonts.map(font => {
            return`@font-face {
font-family: '${font.family}';
font-style: ${font.variants};
font-weight: ${font.weight};
src: url(${font.url.woff2}) format('woff2'), url(${font.url.woff}) format('woff'),url(${font.url.ttf}) format('ttf'),url(${font.url.woff2}) format('eot');
}\n`;
        });
        style.textContent = output.join(" ");
        document.getElementsByTagName("head")[0].append(style);
        cb();
    };
    this.testLoad = function (cb) {
        let arr = [];
        arr.push({
            "weight": "400",
            "id": "585829163d53a3643708ea39",
            "variants": "normal",
            "category": "sans-serif",
            "family": "ABeeZee",
            "url": {
                "svg": "http://fonts.gstatic.com/l/font?kit=Q9Ho64D2EGNbyR7RUlvCNQ&skey=abecda27d5b3409a&v=v9#ABeeZee",
                "ttf": "http://fonts.gstatic.com/s/abeezee/v9/JYPhMn-3Xw-JGuyB-fEdNA.ttf",
                "woff2": "http://fonts.gstatic.com/s/abeezee/v9/m_J3nYLkIiGqm2wAiy01kg.woff",
                "eot": "http://fonts.gstatic.com/s/abeezee/v9/mHe7YG9wQgrkYxToGNllew.eot",
                "woff": "http://fonts.gstatic.com/s/abeezee/v9/m_J3nYLkIiGqm2wAiy01kg.woff"
            }
        });
        arr.push({
            "weight": "400",
            "id": "585829163d53a3643708ea3b",
            "variants": "normal",
            "category": "serif",
            "family": "Abhaya Libre",
            "url": {
                "svg": "http://fonts.gstatic.com/l/font?kit=zTLc5Jxv6yvb1nHyqBasV1lIn5tFQcqMuf-jhyJP0ps&skey=4aba808beb02377b&v=v1#AbhayaLibre",
                "ttf": "http://fonts.gstatic.com/s/abhayalibre/v1/zTLc5Jxv6yvb1nHyqBasV4nF5uFdDttMLvmWuJdhhgs.ttf",
                "woff2": "http://fonts.gstatic.com/s/abhayalibre/v1/zTLc5Jxv6yvb1nHyqBasV3hCUOGz7vYGh680lGh-uXM.woff",
                "eot": "http://fonts.gstatic.com/s/abhayalibre/v1/zTLc5Jxv6yvb1nHyqBasV3Z2MAKAc2x4R1uOSeegc5U.eot",
                "woff": "http://fonts.gstatic.com/s/abhayalibre/v1/zTLc5Jxv6yvb1nHyqBasV3hCUOGz7vYGh680lGh-uXM.woff"
            }
        });
        arr.push({"weight":"400","id":"585829163d53a3643708eae8","variants":"normal","category":"display","family":"Atomic Age","url":{"svg":"http://fonts.gstatic.com/l/font?kit=YWZsVkN6SDZ8jH2BPffNo6WUboTb-jS2tyCOQMtm97g&skey=dbf7add47a92f990&v=v7#AtomicAge","ttf":"http://fonts.gstatic.com/s/atomicage/v7/YWZsVkN6SDZ8jH2BPffNoy3USBnSvpkopQaUR-2r7iU.ttf","woff2":"http://fonts.gstatic.com/s/atomicage/v7/YWZsVkN6SDZ8jH2BPffNoxsxEYwM7FgeyaSgU71cLG0.woff","eot":"http://fonts.gstatic.com/s/atomicage/v7/YWZsVkN6SDZ8jH2BPffNo1QlYEbsez9cZjKsNMjLOwM.eot","woff":"http://fonts.gstatic.com/s/atomicage/v7/YWZsVkN6SDZ8jH2BPffNoxsxEYwM7FgeyaSgU71cLG0.woff"}});
        arr.push({"weight":"400","id":"585829173d53a3643708f05a","variants":"italic","category":"serif","family":"Sorts Mill Goudy","url":{"svg":"http://fonts.gstatic.com/l/font?kit=UUu1lKiy4hRmBWk599VL1TrNWqUjNcjC_tDGGAqmsQI&skey=f3a9910c3adf6761&v=v6#SortsMillGoudy","ttf":"http://fonts.gstatic.com/s/sortsmillgoudy/v6/UUu1lKiy4hRmBWk599VL1f4EjSn3AhEwRmBJ9NDhg68.ttf","woff2":"http://fonts.gstatic.com/s/sortsmillgoudy/v6/UUu1lKiy4hRmBWk599VL1b2c95eZKbds6ayw__-73Og.woff","eot":"http://fonts.gstatic.com/s/sortsmillgoudy/v6/UUu1lKiy4hRmBWk599VL1ZXQhFpGWsC0T5lWQhihMYs.eot","woff":"http://fonts.gstatic.com/s/sortsmillgoudy/v6/UUu1lKiy4hRmBWk599VL1b2c95eZKbds6ayw__-73Og.woff"}}
            );

        this.loadFontsToHeader(arr,cb);
    }

    this.getTestFonts = function(){
        let arr = [];
        arr.push({
            "weight": "400",
            "id": "585829163d53a3643708ea39",
            "variants": "normal",
            "category": "sans-serif",
            "family": "ABeeZee",
            "url": {
                "svg": "http://fonts.gstatic.com/l/font?kit=Q9Ho64D2EGNbyR7RUlvCNQ&skey=abecda27d5b3409a&v=v9#ABeeZee",
                "ttf": "http://fonts.gstatic.com/s/abeezee/v9/JYPhMn-3Xw-JGuyB-fEdNA.ttf",
                "woff2": "http://fonts.gstatic.com/s/abeezee/v9/m_J3nYLkIiGqm2wAiy01kg.woff",
                "eot": "http://fonts.gstatic.com/s/abeezee/v9/mHe7YG9wQgrkYxToGNllew.eot",
                "woff": "http://fonts.gstatic.com/s/abeezee/v9/m_J3nYLkIiGqm2wAiy01kg.woff"
            }
        });
        arr.push({
            "weight": "400",
            "id": "585829163d53a3643708ea3b",
            "variants": "normal",
            "category": "serif",
            "family": "Abhaya Libre",
            "url": {
                "svg": "http://fonts.gstatic.com/l/font?kit=zTLc5Jxv6yvb1nHyqBasV1lIn5tFQcqMuf-jhyJP0ps&skey=4aba808beb02377b&v=v1#AbhayaLibre",
                "ttf": "http://fonts.gstatic.com/s/abhayalibre/v1/zTLc5Jxv6yvb1nHyqBasV4nF5uFdDttMLvmWuJdhhgs.ttf",
                "woff2": "http://fonts.gstatic.com/s/abhayalibre/v1/zTLc5Jxv6yvb1nHyqBasV3hCUOGz7vYGh680lGh-uXM.woff",
                "eot": "http://fonts.gstatic.com/s/abhayalibre/v1/zTLc5Jxv6yvb1nHyqBasV3Z2MAKAc2x4R1uOSeegc5U.eot",
                "woff": "http://fonts.gstatic.com/s/abhayalibre/v1/zTLc5Jxv6yvb1nHyqBasV3hCUOGz7vYGh680lGh-uXM.woff"
            }
        });
        arr.push({"weight":"400","id":"585829163d53a3643708eae8","variants":"normal","category":"display","family":"Atomic Age","url":{"svg":"http://fonts.gstatic.com/l/font?kit=YWZsVkN6SDZ8jH2BPffNo6WUboTb-jS2tyCOQMtm97g&skey=dbf7add47a92f990&v=v7#AtomicAge","ttf":"http://fonts.gstatic.com/s/atomicage/v7/YWZsVkN6SDZ8jH2BPffNoy3USBnSvpkopQaUR-2r7iU.ttf","woff2":"http://fonts.gstatic.com/s/atomicage/v7/YWZsVkN6SDZ8jH2BPffNoxsxEYwM7FgeyaSgU71cLG0.woff","eot":"http://fonts.gstatic.com/s/atomicage/v7/YWZsVkN6SDZ8jH2BPffNo1QlYEbsez9cZjKsNMjLOwM.eot","woff":"http://fonts.gstatic.com/s/atomicage/v7/YWZsVkN6SDZ8jH2BPffNoxsxEYwM7FgeyaSgU71cLG0.woff"}});
        arr.push({"weight":"400","id":"585829173d53a3643708f05a","variants":"italic","category":"serif","family":"Sorts Mill Goudy","url":{"svg":"http://fonts.gstatic.com/l/font?kit=UUu1lKiy4hRmBWk599VL1TrNWqUjNcjC_tDGGAqmsQI&skey=f3a9910c3adf6761&v=v6#SortsMillGoudy","ttf":"http://fonts.gstatic.com/s/sortsmillgoudy/v6/UUu1lKiy4hRmBWk599VL1f4EjSn3AhEwRmBJ9NDhg68.ttf","woff2":"http://fonts.gstatic.com/s/sortsmillgoudy/v6/UUu1lKiy4hRmBWk599VL1b2c95eZKbds6ayw__-73Og.woff","eot":"http://fonts.gstatic.com/s/sortsmillgoudy/v6/UUu1lKiy4hRmBWk599VL1ZXQhFpGWsC0T5lWQhihMYs.eot","woff":"http://fonts.gstatic.com/s/sortsmillgoudy/v6/UUu1lKiy4hRmBWk599VL1b2c95eZKbds6ayw__-73Og.woff"}}
        );
        return arr;
    }

};