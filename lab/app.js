var cow=[
    "resources/COW_ske.dbbin",
    "resources/COW_tex.json",
    "resources/COW_tex.png"
];

var app = new PIXI.Application();
app.renderer.view.style.position = "absolute";
app.renderer.view.style.left = "0px";
app.renderer.view.style.top = "0px";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.backgroundColor = 0x00ffff;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

const binaryOptions = { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER };

for (const resource of cow) {
    if (resource.indexOf("dbbin") > 0) {
        PIXI.loader.add(resource, resource, binaryOptions);
    }
    else {
        PIXI.loader.add(resource, resource);
    }
}

PIXI.loader.once("complete", (loader, resources) => {
    var factory = dragonBones.PixiFactory.factory;
    factory.parseDragonBonesData(resources[cow[0]].data);
    factory.parseTextureAtlasData(resources[cow[1]].data, resources[cow[2]].texture);

    var armatureDisplay = factory.buildArmatureDisplay("Stickman", "COW");
    armatureDisplay.animation.play("Walk");

    window.player=armatureDisplay;

    armatureDisplay.x = window.innerWidth/2;
    armatureDisplay.y = window.innerHeight/2;

    app.stage.addChild(armatureDisplay);

});
PIXI.loader.load();
