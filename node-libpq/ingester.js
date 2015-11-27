var Generator = require( './generator' );
var PQ        = require( 'libpq' );
var db_str = "postgres://postgres:password@localhost:5432/inserttest";


Ingester = function( max )
{
	this.generator = new Generator( );
	this.conn      = new PQ();
	this.conn.connectSync( db_str );
	this.max       = max;
};


Ingester.prototype.walker = function( )
{
	this.conn.exec( 'BEGIN;' );
	for (var tl=0; tl<1000; tl++)
	{
		var groups = (this.max) ? 3 : Generator.randint( 1, 3 );
		var t_q = this.generator.get_toplevel( groups );
		console.log( tl );
		this.conn.exec( t_q );
		//console.log( this.conn.getvalue( 0 ) );
		this.handle_sub( this.conn.getvalue(0), groups );
	}
	this.conn.exec( 'COMMIT;' );
	this.conn.finish( );
};

Ingester.prototype.handle_sub = function( tl_id, groups )
{
	for (var g=1; g<groups; g++ )
	{
		for (var o=1; o<15; o++)
		{
			var s_q = this.generator.get_sublevel( tl_id, g, o );
			this.conn.exec( s_q );
		}
	}
};

ing = new Ingester( true );
ing.walker();
