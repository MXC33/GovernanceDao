var PixTypesFactory = pc.createScript('pixTypesFactory');


PixTypesFactory.attributes.add('centerPixModelProto', {
    type: 'entity',
    default: null, 
    title: 'Middle Pix Prototype'
});

PixTypesFactory.attributes.add('emptyPixSlotModelProto', {
    type: 'entity',
    default: null, 
    title: 'Empty Pix Prototype'
});

PixTypesFactory.attributes.add('invisiblePixModelProto', {
    type: 'entity',
    default: null, 
    title: 'Invisible Pix Prototype'
});

PixTypesFactory.attributes.add('legendaryPixModelProto', {
    type: 'entity',
    default: null, 
    title: 'Legendary Pix Prototype'
});

PixTypesFactory.attributes.add('rarePixModelProto', {
    type: 'entity',
    default: null, 
    title: 'Rare Pix Prototype'
});

PixTypesFactory.attributes.add('unCommonPixModelProto', {
    type: 'entity',
    default: null, 
    title: 'Uncommon Pix Prototype'
});

PixTypesFactory.attributes.add('commonPixModelProto', {
    type: 'entity',
    default: null, 
    title: 'Common Pix Prototype'
});

PixTypesFactory.attributes.add('outlierPixModelProto', {
    type: 'entity',
    default: null, 
    title: 'Outlier Pix Prototype'
});

// initialize code called once per entity
PixTypesFactory.prototype.initialize = function() {

};

// update code called every frame
PixTypesFactory.prototype.update = function(dt) {

};

PixTypesFactory.prototype.getPixOfTier = function(pixTier) {
    var modelClone;
    switch(pixTier){
        case PixType.Legendary:
            modelClone = this.legendaryPixModelProto.clone();
            break;
        case PixType.Rare:
            modelClone = this.rarePixModelProto.clone();
            break;
        case PixType.Uncommon:
            modelClone = this.unCommonPixModelProto.clone();
            break;
        case PixType.Common:
            modelClone = this.commonPixModelProto.clone();
            break;
        case PixType.Outlier:
            modelClone = this.outlierPixModelProto.clone();
            break;
        case PixType.Empty:
            modelClone = this.emptyPixSlotModelProto.clone();
            break;
        case PixType.MiddleSlot:
            modelClone = this.centerPixModelProto.clone();
            break;
        case PixType.Invisible:
            modelClone = this.invisiblePixModelProto.clone();
            break;
        default:
            console.log("WTF");
            break;
    }

    return modelClone;
};
