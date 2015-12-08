import numpy as np
import math

class Rng( ):

    def __init__( self, seed = [0,1,2,3,4,5,6,7,8,9] ):
        self.i       = 0;
        self.j       = 0;
        self.S       = [0] * 256;
        self.init( seed );
        self.numSize = 4;
        self.buf     = np.array([1, 2, 3, 4 ], dtype=np.int8)
        self.view    = self.buf.view( 'int32' )

    def init( self, key ):
        for i in range( 0, 256 ):
            self.S[ i ] = i;
        j = 0;
        for i in range( 0, 256 ):
            j = (j + self.S[ i ] + key[ i % len( key ) ]) & 255;
            t = self.S[ i ];
            self.S[i] = self.S[ j ];
            self.S[j] = t;
        self.i = 0;
        self.j = 0;

    def next( self ):
        self.i = (self.i + 1) & 255;
        self.j = (self.j + self.S[ self.i ]) & 255;
        t = self.S[self.i];
        self.S[ self.i ] = self.S[ self.j ];
        self.S[ self.j ] = t;
        return self.S[ (t + self.S[ self.i ]) & 255 ];

    def next_float( self ):
        for  i in range( 0, self.numSize ):
            self.buf[ i ] = -127 + self.next( );
        return 0.5 + self.view[ 0 ]/math.pow(2,32);

