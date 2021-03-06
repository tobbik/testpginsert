function Rng( seed ) {
	this.i = 0;
	this.j = 0;
	this.S = new Array();
	if (seed)
		this.init( seed );
	else
		this.init( [0,1,2,3,4,5,6,7,8,9] );
	this.numSize = 4;
	this.buf = new ArrayBuffer( this.numSize );
	this.ivw = new Int8Array( this.buf );
	this.fvw = new Int32Array( this.buf );
}

Rng.prototype.init =function( key )
{
	var i, j, t;
	for(i = 0; i < 256; ++i)
		this.S[i] = i;
	j = 0;
	for(i = 0; i < 256; ++i) {
		j = (j + this.S[i] + key[i % key.length]) & 255;
		t = this.S[i];
		this.S[i] = this.S[j];
		this.S[j] = t;
	}
	this.i = 0;
	this.j = 0;
}

Rng.prototype.next = function( )
{
	var t;
	this.i = (this.i + 1) & 255;
	this.j = (this.j + this.S[this.i]) & 255;
	t = this.S[this.i];
	this.S[this.i] = this.S[this.j];
	this.S[this.j] = t;
	return this.S[(t + this.S[this.i]) & 255];
}

// to provide math.random( )compatability
Rng.prototype.next_float = function( )
{
	for (var i=0; i<this.numSize; i++)
		this.ivw[ i ] = -127 + this.next( );
	return 0.5+this.fvw[ 0 ]/Math.pow(2,32);

	//return Math.abs( this.fvw[ 0 ] - Math.floor( this.fvw ) );
}

module.exports = Rng;
