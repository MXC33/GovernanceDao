var GraphicsQuality = {
	Low: 0,		//Facility planes, Static Drones/Rovers 	res: 0.4
	Medium: 1,	//No animations Facilitys 					res: 0.7
	High: 2,	//Facilitys Animations						res: 1
	Ultra: 3	//
};

var ToolState = {
	InitialMode: 0, 
	BuildPixMode: 1, 
	BuildDroneMode: 2, 
	BuildFacilityMode: 3, 
	DestroyMode: 4, 
	PixelPushMode: 5, 
	OverviewMode: 6, 
	TaskManagerMode: 7, 
	PlanMode: 8,
	PlanPixMode: 9,
	PlanDroneMode: 10,
	PlanFacilityMode: 11,
	ContractMode: 12,
	PlanRoverMode: 13,
	BuildRoverMode: 14, 
}; 

var PixType = {
	Empty: 0, 
	Outlier: 1, 
	Common: 2, 
	Uncommon: 3, 
	Rare: 4, 
	Legendary: 5, 
	MiddleSlot: 6, 
	CompanyTile: 7, 
	Invisible: 8
}; 

var TerritoryType = { 
	None: 0, 
	Pix: 1, 
	Cluster: 2, 
	Area: 3, 
	Sector: 4, 
	Zone: 5, 
	Domain: 6
};

var PixState = {
	InActive: 0,
	Active: 1,
	PendingActive: 2,
	PendingInActive: 3,
	NoContract: 4,
	NotStaked: 5
};

var RoverDamageType = {
	Prestine: 0,
	Worn: 1,
	Damaged: 2,
	Wrecked: 3,
};

//https://easings.net/
var EaseFunctionType = {
    Linear: 0,
	EaseInQuad: 1,
	EaseOutQuad: 2,
	EaseInOutQuad: 3,
	EaseInCubic: 4,
	EaseOutCubic: 5,
	EaseInOutCubic: 6,
	EaseInQuart: 7,
	EaseOutQuart: 8,
	EaseInOutQuart: 9,
	EaseInQuint: 10,
	EaseOutQuint: 11,
	EaseInOutQuint: 12,
	EaseInSine: 13,
	EaseOutSine: 14,
	EaseInOutSine: 15,
	EaseInExpo: 16,
	EaseOutExpo: 17,
	EaseInOutExpo: 18,
	EaseInCirc: 19,
	EaseOutCirc: 20,
	EaseInOutCirc: 21,
	EaseInBack: 22,
	EaseOutBack: 23,
	EaseInOutBack: 24,
	EaseInElastic: 25,
	EaseOutElastic: 26,
	EaseInOutElastic: 27,
	EaseInBounce: 28,
	EaseOutBounce: 29,
	EaseInOutBounce: 30,
};

var bounceOut = function (x) {
	const n1 = 7.5625;
	const d1 = 2.75;

	if (x < 1 / d1) {
		return n1 * x * x;
	} else if (x < 2 / d1) {
		return n1 * (x -= 1.5 / d1) * x + 0.75;
	} else if (x < 2.5 / d1) {
		return n1 * (x -= 2.25 / d1) * x + 0.9375;
	} else {
		return n1 * (x -= 2.625 / d1) * x + 0.984375;
	}
};

var easeFunctions = {
	linear: (x) => x,
	easeInQuad: function (x) {
		return x * x;
	},
	easeOutQuad: function (x) {
		return 1 - (1 - x) * (1 - x);
	},
	easeInOutQuad: function (x) {
		return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
	},
	easeInCubic: function (x) {
		return x * x * x;
	},
	easeOutCubic: function (x) {
		return 1 - Math.pow(1 - x, 3);
	},
	easeInOutCubic: function (x) {
		return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
	},
	easeInQuart: function (x) {
		return x * x * x * x;
	},
	easeOutQuart: function (x) {
		return 1 - Math.pow(1 - x, 4);
	},
	easeInOutQuart: function (x) {
		return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
	},
	easeInQuint: function (x) {
		return x * x * x * x * x;
	},
	easeOutQuint: function (x) {
		return 1 - Math.pow(1 - x, 5);
	},
	easeInOutQuint: function (x) {
		return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
	},
	easeInSine: function (x) {
		return 1 - Math.cos((x * Math.PI) / 2);
	},
	easeOutSine: function (x) {
		return Math.sin((x * Math.PI) / 2);
	},
	easeInOutSine: function (x) {
		return -(Math.cos(Math.PI * x) - 1) / 2;
	},
	easeInExpo: function (x) {
		return x == 0 ? 0 : Math.pow(2, 10 * x - 10);
	},
	easeOutExpo: function (x) {
		return x == 1 ? 1 : 1 - Math.pow(2, -10 * x);
	},
	easeInOutExpo: function (x) {
		return x == 0 ? 0 : x == 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
	},
	easeInCirc: function (x) {
		return 1 - Math.sqrt(1 - Math.pow(x, 2));
	},
	easeOutCirc: function (x) {
		return Math.sqrt(1 - Math.pow(x - 1, 2));
	},
	easeInOutCirc: function (x) {
		return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
	},
	easeInBack: function (x) {        
        const c1 = 1.70158;
        const c3 = c1 + 1;
		return c3 * x * x * x - c1 * x * x;
	},
	easeOutBack: function (x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
		return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
	},
	easeInOutBack: function (x) {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
		return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
	},
	easeInElastic: function (x) {
        const c4 = (2 * Math.PI) / 3;
		return x == 0 ? 0 : x == 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
	},
	easeOutElastic: function (x) {
        const c4 = (2 * Math.PI) / 3;
		return x == 0 ? 0 : x == 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
	},
	easeInOutElastic: function (x) {
        const c5 = (2 * Math.PI) / 4.5;
		return x == 0 ? 0: x == 1 ? 1: x < 0.5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
	},
	easeInBounce: function (x) {
		return 1 - bounceOut(1 - x);
	},
	easeOutBounce: bounceOut,
	easeInOutBounce: function (x) {
		return x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2;
	},
};

var easeFunctionsArray = Object.values(easeFunctions);



/*
function easeOutExpo (t, b, c, d) {
    return (t >= d) ? b + c : c * (-Math.Math.pow(2, -10 * t / d) + 1) + b;
}

function easeInExpo(x) {
    return x === 0 ? 0 : Math.Math.pow(2, 10 * x - 10);
}

function easeOutElastic(x) {
    const c4 = (2 * Math.Math.PI) / 3;
    return x == 0 ? 0 : x == 1 ? 1 : Math.Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

function easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.Math.pow(-2 * x + 2, 5) / 2;
}

function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.Math.pow(x - 1, 3) + c1 * Math.Math.pow(x - 1, 2);
}*/