

uniform sampler2D uDisplacementMaskMap;
uniform float uPixHeight;
uniform float uHeightOffset;
uniform float uWorldSize;
uniform float uFract;
uniform float uOffsetX;
uniform int uErosion;
uniform float uTime;
uniform float uValley;

uniform float uColorM;
uniform float uColorP;
uniform float uColorK;

uniform float uLineK;
uniform float uLineM;
uniform float uLineP;

uniform float uOutlineOpacity;
uniform float uOutlineThickness;


void main(void) {
    dReflection = vec4(0);
    #ifdef LIT_CLEARCOAT
    ccSpecularLight = vec3(0);
    ccReflection = vec3(0);
    #endif

