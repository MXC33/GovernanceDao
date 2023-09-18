    
    gl_FragColor.rgb = combineColor();
    gl_FragColor.rgb += dEmission;
    gl_FragColor.rgb = addFog(gl_FragColor.rgb);
    #ifndef HDR
    gl_FragColor.rgb = toneMap(gl_FragColor.rgb);
    gl_FragColor.rgb = gammaCorrectOutput(gl_FragColor.rgb);
    #endif

    float x = vUv0.x*2.0 - 1.0;
    float y = vUv0.y*2.0 - 1.0;
    
    float r = (atan(y, x)/3.1415 + 1.0)/2.0;
    //gl_FragColor.rgb = vec3(r, 0.0, r);
    if(r > uProgress)
        dAlpha = 0.0;
    
    //dAlpha *= r;