var fs   = require( 'fs' ),
    util = require( 'util' );
var Rng  = require( './rng' );


Generator = function( )
{
	this.start  = new Date( 1980, 1, 1, 0, 0, 0, 0).getTime( )
	this.end    = new Date( 2014, 1, 1, 0, 0, 0, 0).getTime( )
	this.words  = fs.readFileSync( '../words.txt' ).toString( ).split( '\n' );
	this.length = this.words.length - 1;
	//this.rng    = new Rng( [4,12,78,43,213,178,34,17] );
	//this.rng    = new Rng( [82,101,14,7,168,213,234,88,54,123,253] );
	this.rng    = new Rng( [82,101,14,7,213,234,54,123,253] );
};

Generator.prototype.randint = function( min, max )
{
	return Math.floor( this.rng.next_float( ) * (max - min) ) + min;
}

Generator.prototype.getword = function( )
{
	return this.words[ this.randint( 0, this.length ) ];
};

Generator.prototype.getphrase = function( lower, upper )
{
	var p = [];
	for (var x = 0; x < this.randint( lower, upper ); x++ )
	{
		p.push( this.words[ this.randint( 0, this.length ) ] )
	}
	return p.join(' ' );
};


Generator.prototype.gettimestamp = function(  )
{
	return new Date( this.randint( this.start, this.end ) );
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
		(this.randint( 1, 100) %2) ? "True" : "False",
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
		(this.randint( 1, 100) %2) ? "True" : "False",
		this.getword(),      // TODO: make real UPC
		this.getphrase(4,10),

		this.getword(),
		this.getword(),
		this.getphrase(1,5),
		this.getword(),
		this.getphrase(5,12),
		this.getphrase(4,9),
		this.randint(23,500)
	);
};
 

Generator.prototype.get_toplevel_json = function( groups )
{
	return util.format( "INSERT INTO toplevel (topvalue, groups, valid_since)" +
		") VALUES (" +
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
		(this.randint( 1, 100) %2) ? "True" : "False",
		this.getphrase(2,5),
		this.getword(),
		this.getphrase(5,12),
		this.getphrase(4,9),
		(new Date( )).toISOString( )
	);
};


Generator.prototype.get_sublevel_json = function( toplevel_id, grouping, order_number )
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
		(this.randint( 1, 100) %2) ? "True" : "False",
		this.getword(),      // TODO: make real UPC
		this.getphrase(4,10),

		this.getword(),
		this.getword(),
		this.getphrase(1,5),
		this.getword(),
		this.getphrase(5,12),
		this.getphrase(4,9),
		this.randint(23,500)
	);
};
 
module.exports = Generator;
