var fs   = require( 'fs' ),
    util = require( 'util' );


Generator = function( )
{
	this.start  = new Date( 1980, 1, 1, 0, 0, 0, 0).getTime( )
	this.end    = new Date( 2014, 1, 1, 0, 0, 0, 0).getTime( )
	this.words  = fs.readFileSync( '../words.txt' ).toString( ).split( '\n' );
	this.length = this.words.length - 1;
};

Generator.randint = function( min, max )
{
	return Math.floor( Math.random( ) * (max - min) ) + min;
}


Generator.prototype.getword = function( )
{
	return this.words[ Generator.randint( 0, this.length ) ];
};

Generator.prototype.getphrase = function( lower, upper )
{
	var p = [];
	for (var x = 0; x < Generator.randint( lower, upper ); x++ )
	{
		p.push( this.words[ Generator.randint( 0, this.length ) ] )
	}
	return p.join(' ' );
};


Generator.prototype.gettimestamp = function(  )
{
	return new Date( Generator.randint( this.start, this.end ) );
};

Generator.prototype.get_toplevel = function( groups )
{
	return util.format( "INSERT INTO toplevel (" +
		"   name, tag1, tag2, groups, upc, valid_since, has_feature," +
		"   owner, master_tag, description1, description2, created_at" +
		") VALUES (" +
		"   '%s', '%s','%s', %d,     '%s', '%s',        %s," +
		"   '%s', '%s',        '%s',         '%s',        '%s') RETURNING toplevel_id" ,
		this.getphrase(2,5),
		this.getword(),
		this.getword(),
		groups,
		this.getword(),      // TODO: make real UPC
		this.gettimestamp().toISOString( ),
		(Generator.randint( 1, 100) %2) ? "True" : "False",
		this.getphrase(2,5),
		this.getword(),
		this.getphrase(5,12),
		this.getphrase(4,9),
		(new Date( )).toISOString( )
	);
};


Generator.prototype.get_sublevel = function( toplevel_id, grouping, order_number )
{
	return util.format( "INSERT INTO sublevel (" +
		"   toplevel_id, grouping, order_number, is_valid, upc, name," +
		"   tag1, tag2, owner, master_tag, description1, description2, length" +
		") VALUES (" +
		"   %d, %d, %d, %s, '%s','%s'," +
		"   '%s', '%s', '%s',  '%s',       '%s',        '%s',         %d) RETURNING sublevel_id",
		toplevel_id,
		grouping,
		order_number,
		(Generator.randint( 1, 100) %2) ? "True" : "False",
		this.getword(),      // TODO: make real UPC
		this.getphrase(4,10),

		this.getword(),
		this.getword(),
		this.getphrase(1,5),
		this.getword(),
		this.getphrase(5,12),
		this.getphrase(4,9),
		Generator.randint(23,500)
	);
};

module.exports = Generator;
