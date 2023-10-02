var FacilityTypesFactory = pc.createScript('facilityTypesFactory');

FacilityTypesFactory.attributes.add('legendaryFacilityModelProto', {
    type: 'entity',
    array: true, 
    title: 'Legendary Facility Prototype'
});

FacilityTypesFactory.attributes.add('rareFacilityModelProto', {
    type: 'entity',
    array: true, 
    title: 'Rare Facility Prototype'
});

FacilityTypesFactory.attributes.add('unCommonFacilityModelProto', {
    type: 'entity',
    array: true, 
    title: 'Uncommon Facility Prototype'
});

FacilityTypesFactory.attributes.add('commonFacilityModelProto', {
    type: 'entity',
    array: true, 
    title: 'Common Facility Prototype'
});

FacilityTypesFactory.attributes.add('outlierFacilityModelProto', {
    type: 'entity',
    array: true, 
    title: 'Outlier Facility Prototype'
});

FacilityTypesFactory.attributes.add('facilityBillBoardModelProto', {
    type: 'entity',
    title: 'facility BillBoard Model Proto'
});

// initialize code called once per entity
FacilityTypesFactory.prototype.initialize = function() {

};

// update code called every frame
FacilityTypesFactory.prototype.getFacility = function(tier, quality) {
    var facility = null;

    switch(tier){
        case PixType.Outlier:
            facility = this.getFacilityFromArray(this.outlierFacilityModelProto, quality);
            break;
        case PixType.Common:
            facility =  this.getFacilityFromArray(this.commonFacilityModelProto, quality);
            break;
        case PixType.Uncommon:
            facility =  this.getFacilityFromArray(this.unCommonFacilityModelProto, quality);
            break;
        case PixType.Rare:
            facility =  this.getFacilityFromArray(this.rareFacilityModelProto, quality);
            break;
        case PixType.Legendary:
            facility =  this.getFacilityFromArray(this.legendaryFacilityModelProto, quality);
    }

    return facility.clone();
};

FacilityTypesFactory.prototype.getFacilityFromArray = function(array, quality) {
    const length = array.length;
    const isNull = array[quality] == null;
    const qualityLarger = quality >= length;

    //console.log("qualityLarger", qualityLarger, "isNull", isNull);

    if (isNull || qualityLarger) {
        for (var i = length - 1; i >= 0; i--) {
            if (array[i] != null) {
                return array[i];
            }
        }
    }
    return array[quality];
};
