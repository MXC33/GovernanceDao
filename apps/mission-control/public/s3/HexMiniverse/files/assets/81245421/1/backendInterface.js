var BackendInterface = pc.createScript('backendInterface');

BackendInterface.attributes.add('pixGridEntity', {type: 'entity', default: null, title: 'Pix Grid Entity' });
BackendInterface.attributes.add('gameLogicsEntity', {type: 'entity', default: null, title: 'Game Logics Entity'});

// initialize code called once per entity
BackendInterface.prototype.initialize = function() {
    this.pixGrid = this.pixGridEntity.script.pixGrid;
    this.gameLogics = this.gameLogicsEntity.script.gameLogics;

    //Connect to web3
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
};

BackendInterface.prototype.update = function(dt) {
    //Continiously load waste on each PIX from chain
    if(this.hasWeb3Connection)
        this.updateWasteOnPixs(dt);

    //Continiously load energy on each PIX from chain
    if(this.hasWeb3Connection)
        this.updateEnergyOnPixs(dt);
};

BackendInterface.prototype.updateWasteOnPixs = function(dt) {
    this.pixGrid.pixTable.forEach((pix, pixCord) => {
        var pixScript = pix.script.pixScript;
    }); 
};

BackendInterface.prototype.updateEnergyOnPixs = function(dt) {
    this.pixGrid.pixTable.forEach((pix, pixCord) => {
        var pixScript = pix.script.pixScript;
    });
};

BackendInterface.prototype.onPixBuild = function(buildType, pixCord, tier) {
    switch(buildType) {
        case buildTypeEnum.Pix:
            break;
        case buildTypeEnum.Destroy:
        break;
        case buildTypeEnum.Drone:
        break;
        case buildTypeEnum.Facility:
        break;
        default:
    }
};

BackendInterface.prototype.loadWorld = async function() {
    for(var x = -this.pixGrid.nrOfRings; x <= this.pixGrid.nrOfRings; x++){
        for(var y = -this.pixGrid.nrOfRings; y <= this.pixGrid.nrOfRings; y++){
            for(var z = -this.pixGrid.nrOfRings; z <= this.pixGrid.nrOfRings; z++){
                if((x == 0 && y == 0 && z == 0 )|| (x + y + z != 0))
                    continue;         
            }
        }
    }
};


/*
Example: Event
    this.daiContract.on("NFTPlaced", (user, tokenAddress, tokenId, x, y, z) => {
        console.log("NFTPlaced");
        console.log(user + ", " + tokenAddress);
        console.log(x + ", " + y + ", " + z + ": " + tokenId);
        this.onPixChangedEvent(x, y, z, tokenId)
    });
*/

/*
Example: Call read function
    this.daiContract.getWasteOnPix(x, y, z).then((wasteOnPix) => {
        pixScript.setWaste(wasteOnPix);
    });
*/

/*
Example: Call write function
    this.daiContractWithSigner.placeNFT(pixCord.q, pixCord.r, pixCord.s, tier).then(() => {
        console.log("placeNFT");
    });
*/