
uniform float uProgress;

void main(void) {
    dReflection = vec4(0);
    #ifdef LIT_CLEARCOAT
    ccSpecularLight = vec3(0);
    ccReflection = vec3(0);
    #endif
