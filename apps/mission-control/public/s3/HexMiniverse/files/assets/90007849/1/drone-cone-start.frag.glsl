
int b(int N, int B) { return N>>B & 1; }
int T[] = int[](0x15,0x38,0x32,0x2c,0x0d,0x13,0x07,0x2a);
int Am[] = int[](0,0,0);

int b(int i, int j, int k, int B) { return T[b(i,B)<<2 | b(j,B)<<1 | b(k,B)]; }

int shuffle(int i, int j, int k) {
    return b(i,j,k,0) + b(j,k,i,1) + b(k,i,j,2) + b(i,j,k,3) +
        b(j,k,i,4) + b(k,i,j,5) + b(i,j,k,6) + b(j,k,i,7) ;
}

float K(int a, vec3 uvw, vec3 ijk)
{
    float s = float(Am[0]+Am[1]+Am[2])/6.0;
    float x = uvw.x - float(Am[0]) + s,
        y = uvw.y - float(Am[1]) + s,
        z = uvw.z - float(Am[2]) + s,
        t = 0.6 - x * x - y * y - z * z;
    int h = shuffle(int(ijk.x) + Am[0], int(ijk.y) + Am[1], int(ijk.z) + Am[2]);
    Am[a]++;
    if (t < 0.0)
        return 0.0;
    int b5 = h>>5 & 1, b4 = h>>4 & 1, b3 = h>>3 & 1, b2= h>>2 & 1, b = h & 3;
    float p = b==1?x:b==2?y:z, q = b==1?y:b==2?z:x, r = b==1?z:b==2?x:y;
    p = (b5==b3 ? -p : p); q = (b5==b4 ? -q : q); r = (b5!=(b4^b3) ? -r : r);
    t *= t;
    return 8.0 * t * t * (p + (b==0 ? q+r : b2==0 ? q : r));
}
    
float perlinNoise(float x, float y, float z)
{
    float s = (x + y + z) / 3.0;  
    vec3 ijk = vec3(int(floor(x+s)), int(floor(y+s)), int(floor(z+s)));
    s = float(ijk.x + ijk.y + ijk.z) / 6.0;
    vec3 uvw = vec3(x - float(ijk.x) + s, y - float(ijk.y) + s, z - float(ijk.z) + s);
    Am[0] = Am[1] = Am[2] = 0;
    int hi = uvw.x >= uvw.z ? uvw.x >= uvw.y ? 0 : 1 : uvw.y >= uvw.z ? 1 : 2;
    int lo = uvw.x <  uvw.z ? uvw.x <  uvw.y ? 0 : 1 : uvw.y <  uvw.z ? 1 : 2;
    return K(hi, uvw, ijk) + K(3 - hi - lo, uvw, ijk) + K(lo, uvw, ijk) + K(0, uvw, ijk);
}

uniform float uTime;
uniform float uTimeScale;
uniform float uXZScale;
uniform float uYScale;
uniform float uNormExp;
uniform float uHeightCutoff;

void main(void) {
    dReflection = vec4(0);
    #ifdef LIT_CLEARCOAT
    ccSpecularLight = vec3(0);
    ccReflection = vec3(0);
    #endif
