

#ifdef MAPFLOAT
uniform float material_opacity;
#endif
#ifdef MAPTEXTURE
uniform sampler2D colorBuffer;
uniform float magnitudeThreshold;
#endif

float dist(vec4 color){
    return sqrt(color.x * color.x + color.y * color.y + color.z * color.z + color.w * color.w);
}

void getAlbedo() {

    vec4 color = texture2D(colorBuffer, vUv0);
    //float magnitude = distance(vec4(0.0), color);
    float magnitude = dist(color);
    //dEmission = color.xyz;
    if(magnitude > magnitudeThreshold)
        gl_FragColor = color;
    else    
        discard;//dAlpha = 0.0;
} 