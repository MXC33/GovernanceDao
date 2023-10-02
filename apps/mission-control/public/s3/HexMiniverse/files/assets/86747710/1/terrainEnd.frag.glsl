    
    gl_FragColor.rgb = combineColor();
    gl_FragColor.rgb += dEmission;
    gl_FragColor.rgb = addFog(gl_FragColor.rgb);
    #ifndef HDR
    gl_FragColor.rgb = toneMap(gl_FragColor.rgb);
    gl_FragColor.rgb = gammaCorrectOutput(gl_FragColor.rgb);
    #endif


    vec4 heightTex = texture2D(uDisplacementMaskMap, vPositionW.xz*0.03 + vec2(0.5, 0.5), textureBias);


    float stepSize = 1.0/uFract;
    float heightFactor = vPositionW.y/uPixHeight;

    float lineHeight = heightTex.g;
    float lineWidth = heightTex.r;


    float onPlaneFactor = mix(0.0, 1.0, 1.0 - abs(lineHeight - heightFactor)/(stepSize*0.5));


    dAlpha *= onPlaneFactor * lineWidth;
    gl_FragColor.rgb *= onPlaneFactor*lineWidth;

    gl_FragColor.rgb *= pow(heightFactor, uColorP)*uColorK + uColorM;
